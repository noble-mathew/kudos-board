import { Route } from "react-router-dom"

import "../App.css"

import { Card } from "./Card"

export function CardContainer({ cardData, onDelete, onVote}) {
    return (
        <div id="card-container">
            {cardData ? cardData.map(card => {
                return <Card key={card.id} id={card.id} title={card.title} description={card.description} imageUrl={card.imageUrl} owner={card.owner} voteCount={card.votes} onDelete={onDelete} onVote={onVote} />
            }) : <h2>No Cards Found</h2>}
        </div>
    )
}