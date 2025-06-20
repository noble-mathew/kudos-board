// src/components/NewCommentForm.jsx
import { useState } from "react";
import "../App.css";

export function NewCommentForm({ boardId, cardId, onSubmit, onClose }) {
    const [message, setMessage] = useState("");
    const [owner, setOwner]     = useState("");

    const handleSubmit = async e => {
        e.preventDefault();
        await onSubmit(boardId, cardId, { message, author: owner }); 
        onClose();
    };

    return (
        <form className="comment-form" onSubmit={handleSubmit}>
            <input type="text" value={owner} placeholder="Your name (optional)" onChange={e => setOwner(e.target.value)} />
        <input type="text" value={message} placeholder="Your message" onChange={e => setMessage(e.target.value)} required />
            <div className="comment-buttons">
                <button type="submit">Submit</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </div>
        </form>
    );
}
