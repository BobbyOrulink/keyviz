use std::{sync::Mutex, thread};

use rdev::{listen, Button, Event, EventType, Key};
use serde::Serialize;
use tauri::{menu::MenuItem, AppHandle, Emitter, Manager, Wry};

use crate::app::state::AppState;

#[derive(Debug, Clone, Serialize)]
#[serde(tag = "type")]
pub enum InputEvent {
    KeyEvent { pressed: bool, name: String },
    MouseButtonEvent { pressed: bool, button: MouseButton },
    MouseMoveEvent { x: f64, y: f64 },
    MouseWheelEvent { delta_x: i64, delta_y: i64 },
}

#[derive(Debug, Clone, Serialize)]
pub enum MouseButton {
    Left,
    Right,
    Middle,
    Other,
}

pub fn map_mouse_button(button: Button) -> MouseButton {
    match button {
        Button::Left => MouseButton::Left,
        Button::Right => MouseButton::Right,
        Button::Middle => MouseButton::Middle,
        _ => MouseButton::Other,
    }
}

fn extended_function_key_name(platform_code: u32, position_code: u32) -> Option<&'static str> {
    match (platform_code, position_code) {
        (0x7C, _) | (_, 0x64) => Some("F13"),
        (0x7D, _) | (_, 0x65) => Some("F14"),
        (0x7E, _) | (_, 0x66) => Some("F15"),
        (0x7F, _) | (_, 0x67) => Some("F16"),
        (0x80, _) | (_, 0x68) => Some("F17"),
        (0x81, _) | (_, 0x69) => Some("F18"),
        (0x82, _) | (_, 0x6A) => Some("F19"),
        (0x83, _) | (_, 0x6B) => Some("F20"),
        (0x84, _) | (_, 0x6C) => Some("F21"),
        (0x85, _) | (_, 0x6D) => Some("F22"),
        (0x86, _) | (_, 0x6E) => Some("F23"),
        (0x87, _) | (_, 0x76) => Some("F24"),
        _ => None,
    }
}

fn key_name_from_event(event: &Event, key: Key) -> Option<String> {
    let key_name = format!("{:?}", key);

    if !key_name.contains('(') {
        return Some(key_name);
    }

    extended_function_key_name(event.platform_code, event.position_code).map(str::to_string)
}

pub fn start_listener(app_handle: AppHandle, toggle_menu_item: MenuItem<Wry>) {
    thread::spawn(move || {
        println!("Starting global input listener...");

        if let Err(err) = listen(move |event| {
            // get app state
            let state = app_handle.state::<Mutex<AppState>>();
            let mut app_state = state.lock().unwrap();

            // track pressed keys
            if let EventType::KeyPress(key) = event.event_type {
                let Some(key_name) = key_name_from_event(&event, key) else {
                    return;
                };
                // if key is already marked as pressed, ignore repeat
                if app_state.pressed_keys.contains(&key_name) {
                    return;
                }
                // record key as pressed
                app_state.pressed_keys.push(key_name);
                // check if toggle shortcut is pressed
                if app_state.toggle_shortcut == app_state.pressed_keys {
                    app_state.toggle_listener(&app_handle, &toggle_menu_item);

                    if !app_state.listening {
                        // emit key releases for all pressed keys
                        for key_name in &app_state.pressed_keys {
                            app_handle
                                .emit_to(
                                    "main",
                                    "input-event",
                                    InputEvent::KeyEvent {
                                        pressed: false,
                                        name: key_name.clone(),
                                    },
                                )
                                .unwrap()
                        }
                    }
                }
            } else if let EventType::KeyRelease(key) = event.event_type {
                let Some(key_name) = key_name_from_event(&event, key) else {
                    return;
                };
                // remove key from pressed keys
                app_state.pressed_keys.retain(|k| k != &key_name);
            }

            // emit event if listening
            if !app_state.listening {
                return;
            }
            let input_event = match event.event_type {
                EventType::KeyPress(key) => key_name_from_event(&event, key).map(|name| {
                    InputEvent::KeyEvent {
                        pressed: true,
                        name,
                    }
                }),
                EventType::KeyRelease(key) => key_name_from_event(&event, key).map(|name| {
                    InputEvent::KeyEvent {
                        pressed: false,
                        name,
                    }
                }),
                EventType::ButtonPress(button) => Some(InputEvent::MouseButtonEvent {
                    pressed: true,
                    button: map_mouse_button(button),
                }),
                EventType::ButtonRelease(button) => Some(InputEvent::MouseButtonEvent {
                    button: map_mouse_button(button),
                    pressed: false,
                }),
                EventType::MouseMove { x, y } => {
                    // Convert Physical -> Logical
                    #[cfg(target_os = "macos")]
                    let (logical_x, logical_y) = (
                        x - app_state.monitor_position.0 as f64,
                        y - app_state.monitor_position.1 as f64,
                    );

                    #[cfg(not(target_os = "macos"))]
                    let (logical_x, logical_y) = {
                        let scale = app_state.monitor_scale;
                        let (offset_x, offset_y) = app_state.monitor_position;
                        ((x - offset_x as f64) / scale, (y - offset_y as f64) / scale)
                    };

                    Some(InputEvent::MouseMoveEvent {
                        x: logical_x,
                        y: logical_y,
                    })
                }
                EventType::Wheel { delta_x, delta_y } => {
                    Some(InputEvent::MouseWheelEvent { delta_x, delta_y })
                }
            };

            app_handle.emit("input-event", input_event).unwrap();
        }) {
            eprintln!("rdev listen failed: {:?}", err);
        }
    });
}
