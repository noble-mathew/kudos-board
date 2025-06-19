import { useState, useEffect } from "react"

import "../App.css"

export function Search({ onSubmit, value }) {
    const [input, setInput] = useState(value);

    const handleInputChange = (e) => {
        setInput(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(input);
    }

    const handleClear = (e) => {
        e.preventDefault();
        setInput("");
        onSubmit("");
    }

    useEffect(() => {
        setInput(value);
    }, [value]);

    return (
        <form id="board-search" onSubmit={handleSubmit} onReset={handleClear}>
            <input name="board-search" placeholder="Search for boards" value={input} onChange={handleInputChange} />
            <button type="submit">Search</button>
            <button type="reset">Clear</button>
        </form>
    )
}