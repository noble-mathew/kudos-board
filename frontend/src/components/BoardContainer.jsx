import "../App.css"

import { Board } from "./Board"

export function BoardContainer({ boardData, onDelete}) {
    return (
        <div id="board-container">
            {boardData?.map(board => {
                return <Board key={board.id} id={board.id} title={board.title} category={board.category} imageUrl={board.imageUrl} author={board.author} onDelete={onDelete} />
            })}
        </div>
    )
}