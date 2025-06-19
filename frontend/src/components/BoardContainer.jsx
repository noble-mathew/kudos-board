import "../App.css"
import { Link } from "react-router-dom"
import { Board } from "./Board"

export function BoardContainer({ boardData, onDelete }) {
    return (
        <div id="board-container">
            {boardData ? boardData.map(board => (
                <Link key={board.id} to={`/boards/${board.id}`} className="board-link" style={{ textDecoration: "none" }}>
                    <Board id={board.id} title={board.title} category={board.category} imageUrl={board.imageUrl} author={board.author} onDelete={onDelete} />
                </Link>
            )): <h2>No Cards Found</h2>}
        </div>
    )
}
