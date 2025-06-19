import "../App.css"

import { useEffect, useState } from 'react'
import { getBoardData } from '../utils/api'

import { Search } from './Search'
import { Nav } from './Nav'
import { BoardContainer } from './BoardContainer'
import { NewBoardForm } from './NewBoardForm'

export function BoardPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [filterOption, setFilterOption] = useState("");
    const [displayNewBoardForm, setDisplayNewBoardForm] = useState(false);
    const [boardData, setBoardData] = useState([]);
    
    const handleNewBoardDisplayChange = () => {
        setDisplayNewBoardForm(prev => !prev);
    }
    
    const handleSearchChange = (value) => {
        setSearchQuery(value);
    }
    
    const handleFilterChange = (value) => {
        setFilterOption(value);
    }
    
    const handleCreate = async (newBoard) => {
        try {
            const res = await fetch(import.meta.env.VITE_WEB_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newBoard),
            });
    
            if (!res.ok) {
                throw new Error(`Server error: ${res.status}`);
            }

            await loadBoards();
        } catch (err) {
            console.error("Create failed:", err);
        }
    };
    
    const handleDelete = async (id) => {
        await fetch(`${import.meta.env.VITE_WEB_URL}/${id}`, { method: "DELETE" })
        await loadBoards();
    }
    
    const loadBoards = async (category, search) => {
        const boards = await getBoardData(category, search);
        if (boards) {
            setBoardData(boards);
        }
    }
    
    useEffect(() => {
        loadBoards();
    }, [])
    
    useEffect(() => {
        loadBoards(filterOption, searchQuery);
    }, [searchQuery, filterOption])
    
    return (
        <div>
            <header id="board-header">
                <h1>KUDOBOARD</h1>
                <Search onSubmit={handleSearchChange} value={ searchQuery } />
                <Nav onClick={handleFilterChange} />
                <button onClick={handleNewBoardDisplayChange}>Create New Board</button>
            </header>
            <main>
                <BoardContainer boardData={boardData} onDelete={handleDelete} />
                {displayNewBoardForm && <NewBoardForm onClose={handleNewBoardDisplayChange} onSubmit={handleCreate}/>}
            </main>
        </div>
    )
}