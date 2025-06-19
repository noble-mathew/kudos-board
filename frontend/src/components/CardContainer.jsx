import { Route } from "react-router-dom"

import "../App.css"

import { Card } from "./Card"

export function BoardContainer({ cardDate, onDelete, onUpvote}) {
    return (
        <div id="board-container">
            {boardData?.map(board => {
                return <Board key={board.id} id={board.id} title={board.title} category={board.category} imageUrl={board.imageUrl} author={board.author} onDelete={onDelete} />
            })}
        </div>
    )
}