import { useState, useEffect } from "react"

import "../App.css"

const DEFAULT_IMG = "https://travel.rakuten.com/contents/sites/contents/files/styles/max_1300x1300/public/2024-01/cherry-blossom-tokyo_1.jpg?itok=0QxOQj7Q"

export function Board({ id, title, category, imageUrl, author, onDelete }) {
    const [showPin, setShowPin] = useState(false);

    const handlePinChange = () => {
        setShowPin(prev => !prev);
    }

    const handleImgError = (e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = DEFAULT_IMG;
    };

    const handleDelete = async (id) => {
        await fetch(`${import.meta.env.VITE_WEB_URL}${id}`, { method: "DELETE" })
        await loadBoards();
    }

    return (
        <div id="board">
            <img className="delete-board" src="/delete.png" onClick={() => onDelete(id)}/>
            <img onClick={handlePinChange} className={showPin ? "pin-board show" : "pin-board"} src="/bookmark.png"/>
            <img src={imageUrl || DEFAULT_IMG} onError={handleImgError} alt={`image for ${title}`}/>
            <div className="board-info">
                <h3 className="board-title">{title}</h3>
                <p>{category}</p>
                <p>{author}</p>
            </div>
        </div>
    )
}