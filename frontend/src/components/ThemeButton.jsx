import { useTheme } from "./ThemeProvider";

import "../App.css"

export function ThemeButton() {
    const { theme, toggle } = useTheme();
    return (
        <button onClick={toggle} id="theme-toggle">
            {theme === "light" ? "🌙" : "🌞"}
        </button>
    );
}
