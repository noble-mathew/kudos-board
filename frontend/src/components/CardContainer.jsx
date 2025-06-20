import { Link } from "react-router-dom"

import "../App.css"

import { Card } from "./Card"

export function CardContainer({ cardData, onDelete, onVote, onClick, modalData}) {
    return (
        <div id="card-container">
            {cardData ? cardData.map(card => {
                return <Card key={card.id} data={card} id={card.id} title={card.title} description={card.description} imageUrl={card.imageUrl} owner={card.owner} voteCount={card.votes} onDelete={onDelete} onVote={onVote} onClick={onClick} modalData={modalData} />
            }) : <h2>No Cards Found</h2>}
        </div>
    )
}