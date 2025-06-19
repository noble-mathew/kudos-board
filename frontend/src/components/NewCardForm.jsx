import { useState } from "react"

import "../App.css"

export function NewCardForm({ onSubmit, onClose }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [searchGIF, setSearchGIF] = useState("");
    const [image, setImage] = useState("");
    const [owner, setOwner] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ title, description, imageUrl: image, owner });
        onClose();
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    }

    const handleOwnerChange = (e) => {
        setOwner(e.target.value);
    }

    const handleImageChange = (e) => {
        setImage(e.target.value);
    }

    return (
        <div id="Modal">
            <div onClick={onClose} id="Modal-overlay"></div>
            <div id="Modal-content">
                <p id="Modal-close" onClick={onClose}><strong>&times;</strong></p>
                <h2>Create a New Card</h2>
                <form onSubmit={handleSubmit}>
                    <input value={title} placeholder="Card Title" onChange={handleTitleChange} required/>
                    <input value={description} placeholder="Card Description" onChange={handleDescriptionChange} required/>
                    <input value={image} placeholder="Search GIFs" onChange={handleImageChange}/>
                    <button>Search GIF</button>
                    <input value={image} placeholder="Card Image URL" onChange={handleImageChange} required/>
                    <input value={owner} placeholder="Card Owner (optional)" onChange={handleOwnerChange}/>
                    <button type="submit">Create Card</button>
                </form>
            </div>
        </div>
    )
}