import { Route, Routes } from 'react-router-dom'

import './App.css'
import { BoardPage } from './components/BoardPage'
import { Footer } from './components/Footer'
import { CardPage } from './components/CardPage'

function App() {
  

  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<BoardPage />} />
        <Route path="/boards/:boardId" element={<CardPage/>} />
      </Routes>
      <footer>
        <Footer/>
      </footer>
    </div>
  )
}

export default App
