import "../App.css"

import { useState } from "react";

const DEFAULT_IMG = "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNXV4NGcwcGY2MGVyYmk4OGxlNHRnOXZzYzV6dHR0MDdtbmRzaGR6bCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ZsuqjwKgAtShO/giphy.gif";

export function Card({ id, title, description, imageUrl, owner, voteCount, onDelete, onVote }) {
    const [votes, setVotes] = useState(voteCount);

    const handleImgError = (e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = DEFAULT_IMG;
    };

    const handleUpvote = () => {
        onVote(id, votes + 1);
        setVotes(prev => prev + 1);
    }

    return (
        <div>
            <div id="card">
                <img className="delete-board" src="/delete.png" onClick={(e) => { e.stopPropagation(); e.preventDefault(); onDelete(id)}}/>
                <img src={imageUrl || DEFAULT_IMG} onError={handleImgError} alt={`image for ${title}`}></img>
                <div className="card-info">
                    <h3 className="board-title">{title}</h3>
                    <p>{description}</p>
                    <p>{owner}</p>
                    <button onClick={() => handleUpvote()}>{`Upvote ${voteCount}`}</button>
                </div>
            </div>
        </div>
    )
}