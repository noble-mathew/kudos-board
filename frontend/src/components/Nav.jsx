import { Link, useLocation } from "react-router-dom"

import "../App.css"

export function Nav({onClick}) {
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const category = params.get("category") || "all";

    return (
        <nav>
            <Link to="/">
                <button className={category === "all" ? "active" : ""} onClick={() => onClick()}>
                All
                </button>
            </Link>

            <Link to="/?category=recent">
                <button className={category === "recent" ? "active" : ""} onClick={() => onClick("recent")}>
                Recent
                </button>
            </Link>

            <Link to="/?category=celebration">
                <button className={category === "celebration" ? "active" : ""} onClick={() => onClick("celebration")}>
                Celebration
                </button>
            </Link>

            <Link to="/?category=thank-you">
                <button className={category === "thank-you" ? "active" : ""} onClick={() => onClick("thank-you")}>
                Thank You
                </button>
            </Link>

            <Link to="/?category=inspiration">
                <button className={category === "inspiration" ? "active" : ""} onClick={() => onClick("inspiration")}>
                Inspiration
                </button>
            </Link>
        </nav>
    )
}