import { platform } from "@tauri-apps/plugin-os";
import { MouseLeftClickIcon, MouseMiddleClickIcon, MouseRightClickIcon, MouseRightDragIcon, MouseScrollDownIcon, MouseScrollUpIcon, ReturnIcon } from "@/components/ui/icons";
import { ArrowBigUpDashIcon, ArrowBigUpIcon, ArrowDownIcon, ArrowDownToLineIcon, ArrowLeftIcon, ArrowLeftRightIcon, ArrowRightIcon, ArrowRightToLineIcon, ArrowUpIcon, ArrowUpToLineIcon, ChevronUpIcon, CircleArrowOutUpLeftIcon, CommandIcon, DeleteIcon, Grid2X2Icon, ImageIcon, LockIcon, LucideIcon, MouseIcon, MoveDownRightIcon, MoveUpLeftIcon, OptionIcon, PauseIcon, SpaceIcon, SparkleIcon, Volume2Icon, VolumeXIcon } from "lucide-react";

// ───────────── Platform Logic ─────────────
const currentPlatform = platform();

interface SwitchPlatformConfig<T> {
    windows: T;
    macos: T;
    linux?: T;
}

function switchPlatform<T>(config: SwitchPlatformConfig<T>): T {
    if (currentPlatform === 'macos') {
        return config.macos;
    } else if (currentPlatform === 'linux' && config.linux !== undefined) {
        return config.linux!;
    }
    return config.windows;
}

// ───────────── Key mapping ─────────────
export interface DisplayData {
    // textual representation
    label: string;
    // chinese label if any
    cnLabel?: string;
    // short label if any like ctrl for control
    shortLabel?: string;
    // glyph representation if any like ⌃ for control
    glyph?: string;
    // secondary symbol if any like @ for digit 2
    symbol?: string;
    // chinese secondary symbol if any
    cnSymbol?: string;
    // icon path if can be represented with iconography
    icon?: LucideIcon;
    // category
    category?: "modifier" | "letter" | "digit" | "punctuation" | "function" | "arrow" | "navigation" | "special" | "numpad" | "mouse";
}

// We use the string names from the provided Rust enum as keys
export const keymaps: Record<string, DisplayData> = {
    // ───────────── Function keys ─────────────
    F1: { label: "F1", category: "function" },
    F2: { label: "F2", category: "function" },
    F3: { label: "F3", category: "function" },
    F4: { label: "F4", category: "function" },
    F5: { label: "F5", category: "function" },
    F6: { label: "F6", category: "function" },
    F7: { label: "F7", category: "function" },
    F8: { label: "F8", category: "function" },
    F9: { label: "F9", category: "function" },
    F10: { label: "F10", category: "function" },
    F11: { label: "F11", category: "function" },
    F12: { label: "F12", category: "function" },
    F13: { label: "F13", category: "function" },
    F14: { label: "F14", category: "function" },
    F15: { label: "F15", category: "function" },
    F16: { label: "F16", category: "function" },
    F17: { label: "F17", category: "function" },
    F18: { label: "F18", category: "function" },
    F19: { label: "F19", category: "function" },
    F20: { label: "F20", category: "function" },
    F21: { label: "F21", category: "function" },
    F22: { label: "F22", category: "function" },
    F23: { label: "F23", category: "function" },
    F24: { label: "F24", category: "function" },
    // ───────────── Navigation ─────────────
    PrintScreen: {
        label: "print screen",
        cnLabel: "截屏",
        shortLabel: "prt scrn",
        icon: ImageIcon,
    },
    Pause: {
        label: "pause break",
        cnLabel: "暂停",
        shortLabel: "pause",
        icon: PauseIcon,
    },
    Backspace: {
        label: switchPlatform({
            windows: "backspace",
            macos: "delete",
        }),
        cnLabel: switchPlatform({
            windows: "退格",
            macos: "删除",
        }),
        shortLabel: switchPlatform({
            windows: "back",
            macos: "del",
        }),
        glyph: "⌫",
        icon: DeleteIcon,
        category: "special",
    },
    Tab: {
        label: "tab",
        cnLabel: "制表",
        glyph: "⇆",
        icon: ArrowLeftRightIcon,
        category: "special",
    },
    Space: {
        label: "space",
        cnLabel: "空格",
        glyph: "⎵",
        icon: SpaceIcon,
    },
    Return: {
        label: switchPlatform({
            windows: "enter",
            macos: "return",
        }),
        cnLabel: "回车",
        glyph: "↩",
        icon: ReturnIcon,
        category: "special",
    },
    Apps: {
        label: "menu",
        cnLabel: "菜单",
        glyph: "☰",
    },
    Insert: {
        label: "insert",
        cnLabel: "插入",
        shortLabel: "ins",
        glyph: "⇥",
        icon: ArrowRightToLineIcon,
    },
    Delete: {
        label: "delete",
        cnLabel: "删除",
        shortLabel: "del",
        glyph: "⌦",
        icon: DeleteIcon,
        category: "special",
    },
    Home: {
        label: "home",
        cnLabel: "行首",
        glyph: "⇱",
        icon: MoveUpLeftIcon,
        category: "navigation",
    },
    End: {
        label: "end",
        cnLabel: "行尾",
        glyph: "⇲",
        icon: MoveDownRightIcon,
        category: "navigation",
    },
    PageUp: {
        label: "page up",
        cnLabel: "向上翻页",
        shortLabel: "pg up",
        glyph: "⤒",
        icon: ArrowUpToLineIcon,
        category: "navigation",
    },
    PageDown: {
        label: "page down",
        cnLabel: "向下翻页",
        shortLabel: "pg dn",
        glyph: "⤓",
        icon: ArrowDownToLineIcon,
        category: "navigation",
    },
    UpArrow: {
        label: "up",
        cnLabel: "上",
        glyph: "↑",
        icon: ArrowUpIcon,
        category: "arrow",
    },
    DownArrow: {
        label: "down",
        cnLabel: "下",
        glyph: "↓",
        icon: ArrowDownIcon,
        category: "arrow",
    },
    LeftArrow: {
        label: "left",
        cnLabel: "左",
        glyph: "←",
        icon: ArrowLeftIcon,
        category: "arrow",
    },
    RightArrow: {
        label: "right",
        cnLabel: "右",
        glyph: "→",
        icon: ArrowRightIcon,
        category: "arrow",
    },
    CapsLock: {
        label: "caps lock",
        cnLabel: "大写锁定",
        glyph: "⇪",
        icon: ArrowBigUpDashIcon,
    },
    ScrollLock: {
        label: "scroll lock",
        cnLabel: "滚动锁定",
        glyph: "🖱",
        icon: MouseIcon,
    },
    NumLock: {
        label: "num lock",
        cnLabel: "数字锁定",
        icon: LockIcon,
    },
    Escape: {
        label: "escape",
        cnLabel: "退出",
        shortLabel: "esc",
        glyph: "⎋",
        icon: CircleArrowOutUpLeftIcon,
        category: "special",
    },

    // ───────────── Digits ──────────────
    Num1: {
        label: "1",
        symbol: "!",
        category: "digit",
    },
    Num2: {
        label: "2",
        symbol: "@",
        category: "digit",
    },
    Num3: {
        label: "3",
        symbol: "#",
        category: "digit",
    },
    Num4: {
        label: "4",
        symbol: "$",
        category: "digit",
    },
    Num5: {
        label: "5",
        symbol: "%",
        category: "digit",
    },
    Num6: {
        label: "6",
        symbol: "^",
        category: "digit",
    },
    Num7: {
        label: "7",
        symbol: "&",
        category: "digit",
    },
    Num8: {
        label: "8",
        symbol: "*",
        category: "digit",
    },
    Num9: {
        label: "9",
        symbol: "(",
        category: "digit",
    },
    Num0: {
        label: "0",
        symbol: ")",
        category: "digit",
    },
    // ───────────── Letters ─────────────
    KeyA: { label: "A", category: "letter" },
    KeyB: { label: "B", category: "letter" },
    KeyC: { label: "C", category: "letter" },
    KeyD: { label: "D", category: "letter" },
    KeyE: { label: "E", category: "letter" },
    KeyF: { label: "F", category: "letter" },
    KeyG: { label: "G", category: "letter" },
    KeyH: { label: "H", category: "letter" },
    KeyI: { label: "I", category: "letter" },
    KeyJ: { label: "J", category: "letter" },
    KeyK: { label: "K", category: "letter" },
    KeyL: { label: "L", category: "letter" },
    KeyM: { label: "M", category: "letter" },
    KeyN: { label: "N", category: "letter" },
    KeyO: { label: "O", category: "letter" },
    KeyP: { label: "P", category: "letter" },
    KeyQ: { label: "Q", category: "letter" },
    KeyR: { label: "R", category: "letter" },
    KeyS: { label: "S", category: "letter" },
    KeyT: { label: "T", category: "letter" },
    KeyU: { label: "U", category: "letter" },
    KeyV: { label: "V", category: "letter" },
    KeyW: { label: "W", category: "letter" },
    KeyX: { label: "X", category: "letter" },
    KeyY: { label: "Y", category: "letter" },
    KeyZ: { label: "Z", category: "letter" },
    // ───────────── Punctuation ─────────────
    BackQuote: {
        label: "`",
        symbol: "~",
        category: "punctuation",
    },
    Minus: {
        label: "-",
        symbol: "_",
        category: "punctuation",
    },
    Equal: {
        label: "=",
        symbol: "+",
        category: "punctuation",
    },
    LeftBracket: {
        label: "[",
        symbol: "{",
        category: "punctuation",
    },
    RightBracket: {
        label: "]",
        symbol: "}",
        category: "punctuation",
    },
    BackSlash: {
        label: "\\",
        symbol: "|",
        category: "punctuation",
    },
    SemiColon: {
        label: ";",
        symbol: ":",
        category: "punctuation",
    },
    Quote: {
        label: "'",
        symbol: "\"",
        category: "punctuation",
    },
    Comma: {
        label: ",",
        symbol: "<",
        category: "punctuation",
    },
    Dot: {
        label: ".",
        symbol: ">",
        category: "punctuation",
    },
    Slash: {
        label: "?",
        symbol: "/",
        category: "punctuation",
    },
    // ───────────── Numpad ─────────────
    KpDivide: { label: "/", category: "punctuation" },
    KpMultiply: { label: "*", category: "punctuation" },
    KpMinus: { label: "-", category: "punctuation" },
    KpPlus: { label: "+", category: "punctuation" },
    KpEqual: { label: "=", category: "punctuation" },
    KpComma: { label: ",", category: "punctuation" },
    KpReturn: {
        label: "Enter",
        cnLabel: "回车",
        glyph: "↩",
        category: "numpad",
    },
    KpDecimal: {
        label: ".",
        symbol: "del",
        cnSymbol: "删除",
        category: "numpad",
    },
    Kp0: {
        label: "0",
        symbol: "ins",
        cnSymbol: "插入",
        category: "numpad",
    },
    Kp1: {
        label: "1",
        symbol: "end",
        cnSymbol: "行尾",
        category: "numpad",
    },
    Kp2: {
        label: "2",
        symbol: "▼",
        category: "numpad",
    },
    Kp3: {
        label: "3",
        symbol: "pg dn",
        cnSymbol: "向下翻页",
        category: "numpad",
    },
    Kp4: {
        label: "4",
        symbol: "◀",
        category: "numpad",
    },
    Kp5: {
        label: "5",
        symbol: " ",
        category: "numpad",
    },
    Kp6: {
        label: "6",
        symbol: "▶",
        category: "numpad",
    },
    Kp7: {
        label: "7",
        symbol: "home",
        cnSymbol: "行首",
        category: "numpad",
    },
    Kp8: {
        label: "8",
        symbol: "▲",
        category: "numpad",
    },
    Kp9: {
        label: "9",
        symbol: "pg up",
        cnSymbol: "向上翻页",
        category: "numpad",
    },
    // ───────────── Media ─────────────
    VolumeUp: {
        label: "volume up",
        cnLabel: "增大音量",
        shortLabel: "vol +",
        icon: Volume2Icon,
    },
    VolumeDown: {
        label: "volume down",
        cnLabel: "减小音量",
        shortLabel: "vol -",
        icon: Volume2Icon,
    },
    VolumeMute: {
        label: "mute",
        cnLabel: "静音",
        icon: VolumeXIcon,
    },

    // ───────────── Mouse Events ─────────────
    Left: {
        label: "left click",
        cnLabel: "左键",
        shortLabel: "left",
        icon: MouseLeftClickIcon,
        category: "mouse",
    },
    Middle: {
        label: "middle click",
        cnLabel: "中键",
        shortLabel: "middle",
        icon: MouseMiddleClickIcon,
        category: "mouse",
    },
    Right: {
        label: "right click",
        cnLabel: "右键",
        shortLabel: "right",
        icon: MouseRightClickIcon,
        category: "mouse",
    },
    Drag: {
        label: "drag",
        cnLabel: "拖动",
        icon: MouseRightDragIcon,
        category: "mouse",
    },
    ScrollUp: {
        label: "scroll up",
        cnLabel: "向上滚动",
        shortLabel: "scroll",
        icon: MouseScrollUpIcon,
        category: "mouse",
    },
    ScrollDown: {
        label: "scroll down",
        cnLabel: "向下滚动",
        shortLabel: "scroll",
        icon: MouseScrollDownIcon,
        category: "mouse",
    },
};

// ───────────── Apply Mappings for Modifiers ─────────────

// Control
['ControlLeft', 'ControlRight'].forEach((key) => {
    keymaps[key] = {
        label: "control",
        cnLabel: "控制",
        shortLabel: "ctrl",
        glyph: "⌃",
        icon: ChevronUpIcon,
        category: "modifier",
    };
});

// Meta
['MetaLeft', 'MetaRight'].forEach((key) => {
    keymaps[key] = switchPlatform({
        windows: {
            label: "win",
            cnLabel: "徽标",
            glyph: "\u229E",
            icon: Grid2X2Icon,
            category: "modifier",
        },
        macos: {
            label: "command",
            cnLabel: "命令",
            shortLabel: "cmd",
            glyph: "⌘",
            icon: CommandIcon,
            category: "modifier",
        },
        linux: {
            label: "Meta",
            cnLabel: "超级",
            glyph: "✦",
            icon: SparkleIcon,
            category: "modifier",
        },
    });
});

// Alt
['Alt'].forEach((key) => {
    keymaps[key] = {
        label: switchPlatform({
            windows: "alt",
            macos: "option",
        }),
        cnLabel: switchPlatform({
            windows: "切换",
            macos: "选项",
        }),
        shortLabel: switchPlatform({
            windows: "alt",
            macos: "opt",
        }),
        glyph: "⌥",
        icon: OptionIcon,
        category: "modifier",
    };
});

// Shift
['ShiftLeft', 'ShiftRight'].forEach((key) => {
    keymaps[key] = {
        label: "shift",
        cnLabel: "上档",
        glyph: "⇧",
        icon: ArrowBigUpIcon,
        category: "modifier",
    };
});
