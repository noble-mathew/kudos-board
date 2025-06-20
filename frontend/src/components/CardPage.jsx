import "../App.css"

import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from 'react'
import { getCardData } from '../utils/api'

import { CardContainer } from "./CardContainer"
import { NewCardForm } from "./NewCardForm"
import { CardModal } from "./CardModal"

export function CardPage() {
    const { boardId } = useParams();

    const [displayNewCardForm, setDisplayNewCardForm] = useState(false);
    const [displayCardModal, setDisplayCardModal] = useState(false);
    const [modalCardData, setModalCardData] = useState();
    const [cardData, setCardData] = useState([]);
    
    const handleNewCardDisplayChange = () => {
        setDisplayNewCardForm(prev => !prev);
    }

    const handleCardModalDisplay = () => {
        setDisplayCardModal(prev => !prev);
    }

    const handleModalCardData = (card) => {
        setModalCardData(card);
    }

    const handleCreateCard = async (newCard) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_WEB_URL}/${boardId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newCard),
            });
    
            if (!res.ok) {
                throw new Error(`Server error: ${res.status}`);
            }

            await loadCards(boardId);
        } catch (err) {
            console.error("Create failed:", err);
        }
    };
    
    const handleDelete = async (cardId) => {
        await fetch(`${import.meta.env.VITE_WEB_URL}/${boardId}/${cardId}`, { method: "DELETE" })
        await loadCards(boardId);
    }

    const handleUpvote = async (cardId, votes) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_WEB_URL}/${boardId}/${cardId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ votes }),
                }
            );
        
            if (!res.ok) {
                throw new Error(res.statusText);
            }

            await loadCards(boardId);
        } catch (err) {
        console.error("Upvote failed:", err);
        }
    };

    const loadCards = async (boardId) => {
        const cards = await getCardData(boardId);
        if (cards) {
            setCardData(cards);
        }
    }

    useEffect(() => {
        loadCards(boardId);
    }, []);

    return (
        <div>
            <Link to="/">
                <img src="/back.png" id="back-home" />
            </Link>
            <header id="card-header">
                <h1>KUDOBOARD</h1>
                <button onClick={handleNewCardDisplayChange}>Create New Card</button>
            </header>
            <main>
                <CardContainer boardId={boardId} cardData={cardData} onDelete={handleDelete} onVote={handleUpvote} onClick={handleCardModalDisplay} modalData={handleModalCardData} />
                {displayNewCardForm && <NewCardForm onClose={handleNewCardDisplayChange} onSubmit={handleCreateCard} />}
                {displayCardModal && <CardModal onClose={handleCardModalDisplay} cardData={modalCardData} boardId={boardId} />}
            </main>
        </div>
    )
}