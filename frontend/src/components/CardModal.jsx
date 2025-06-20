import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

import "../App.css"
import { getCommentData } from "../utils/api";

import { Comment } from "./Comment"
import { NewCommentForm } from "./newCommentForm";

const DEFAULT_IMG = "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNXV4NGcwcGY2MGVyYmk4OGxlNHRnOXZzYzV6dHR0MDdtbmRzaGR6bCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ZsuqjwKgAtShO/giphy.gif";

export function CardModal({ onClose, cardData }) {
    const { boardId } = useParams();

    const [commentData, setCommentData] = useState([]);
    const [displayCommentForm, setDisplayCommentForm] = useState(false);

    const handleImgError = (e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = DEFAULT_IMG;
    };

    const handleDisplayCommentFormChange = () => {
        setDisplayCommentForm(prev => !prev);
    }

    const getCommentData = async (boardId, cardId) => {
        try {
            const base = import.meta.env.VITE_WEB_URL; 
            const resp = await fetch(`${base}/${boardId}/cards/${cardId}`);
            if (!resp.ok) {
                throw new Error("Failed to fetch comments");
            }
            
            return resp.json();
        } catch (err) {
            console.error("Create failed:", err);
        }
    }

    const createCommentData = async (boardId, cardId, { message, author }) => {
        try {
            const base = import.meta.env.VITE_WEB_URL;
            const resp = await fetch(`${base}/${boardId}/cards/${cardId}`, {
                method:  "POST",
                headers: { "Content-Type": "application/json" },
                body:    JSON.stringify({ message, author })
            });

            if (!resp.ok) {
                throw new Error("Failed to create comment");
            }
            
            await loadComments(boardId, cardId);
        } catch (err) {
            console.error("Post failed:", err);
        }
    }

    const loadComments = async (boardId, cardId) => {
        const comments = await getCommentData(boardId, cardId);
        if (comments) {
            setCommentData(comments);
        }
    }

    useEffect(() => {
        loadComments(boardId, cardData.id);;
    }, [])

    return (
        <div id="Modal">
            <div onClick={onClose} id="Modal-overlay"></div>
            <div id="Modal-content">
                <p id="Modal-close" onClick={onClose}><strong>&times;</strong></p>
                    <img src={cardData.imageUrl || DEFAULT_IMG} onError={handleImgError}/>
                    <p>{cardData.title}</p>
                    <p>{cardData.description}</p>
                    <p>{cardData.owner}</p>
                    <div className="comment-container">
                        {commentData?.map(comment => {
                            return <Comment key={comment.id} author={comment.author} message={comment.message}/>
                        })}
                    </div>
                    <button onClick={handleDisplayCommentFormChange}>Add Comment</button>
                {displayCommentForm && <NewCommentForm boardId={boardId} cardId={cardData.id} onSubmit={createCommentData} onClose={handleDisplayCommentFormChange}/>}
            </div>
        </div>
    )
}