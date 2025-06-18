import { useState } from "react"

import "../App.css"

export function NewBoardForm({ onSubmit, onClose }) {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [author, setAuthor] = useState("");
    const [image, setImage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit({ title, category, author, image })
        onClose()
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    }

    const handleAuthorChange = (e) => {
        setAuthor(e.target.value);
    }

    const handleImageChange = (e) => {
        setImage(e.target.value);
    }

    return (
        <div id="Modal">
            <div onClick={onClose} id="Modal-overlay"></div>
            <div id="Modal-content">
                <p id="Modal-close" onClick={onClose}><strong>&times;</strong></p>
                <h2>Create a New Board</h2>
                <form onSubmit={handleSubmit}>
                    <label> Title:
                        <input value={title} placeholder="Board Title" onChange={handleTitleChange} required/>
                    </label>

                    <label> Category:
                        <select value={category} onChange={handleCategoryChange} required>
                            <option value="" disabled hidden>Select a category</option>
                            <option value="Celebration">Celebration</option>
                            <option value="Thank You">Thank You</option>
                            <option value="Inspiration">Inspiration</option>
                        </select>
                    </label>

                    <label> Image:
                        <input value={image} placeholder="Board Image URL (optional)" onChange={handleImageChange}/>
                    </label>

                    <label> Author:
                        <input value={author} placeholder="Board Author (optional)" onChange={handleAuthorChange}/>
                    </label>

                    <button type="submit">Create Board</button>
                </form>
            </div>
        </div>
    )
}