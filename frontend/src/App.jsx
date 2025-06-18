import { useEffect, useState } from 'react'
import { getBoardData } from './utils/api'

import './App.css'

import { Search } from './components/Search'
import { Nav } from './components/Nav'
import { BoardContainer } from './components/BoardContainer'
import { NewBoardForm } from './components/NewBoardForm'
import { Footer } from './components/Footer'

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const [displayAll, setDisplayAll] = useState(true);
  const [displayRecent, setDisplayRecent] = useState(false);
  const [displayCelebration, setDisplayCelebration] = useState(false);
  const [displayThanks, setDisplayThanks] = useState(false);
  const [displayInspiration, setDisplayInspiration] = useState(false);

  const [displayNewBoardForm, setDisplayNewBoardForm] = useState(false);

  const [boardData, setBoardData] = useState([]);

  const handleNewBoardDisplayChange = () => {
    setDisplayNewBoardForm(prev => !prev);
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
    await fetch(`${import.meta.env.VITE_WEB_URL}${id}`, { method: "DELETE" })
    await loadBoards();
  }

  const loadBoards = async () => {
    const boards = await getBoardData();
    if (boards) {
      setBoardData(boards);
    }
  }

  useEffect(() => {
    loadBoards();
  }, [])

  return (
    <div className='App'>
      <header id="board-header">
        <h1>KUDOBOARD</h1>
        <Search />
        <Nav />
        <button onClick={handleNewBoardDisplayChange}>Create New Board</button>
      </header>
      <main>
        <BoardContainer boardData={boardData} onDelete={handleDelete} />
        {displayNewBoardForm && <NewBoardForm onClose={handleNewBoardDisplayChange} onSubmit={handleCreate}/>}
      </main>
      <footer>
        <Footer/>
      </footer>
    </div>
  )
}

export default App
