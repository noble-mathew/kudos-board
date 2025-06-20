// src/components/NewCardForm.jsx
import { useState } from "react";
import "../App.css";

export function NewCardForm({ onSubmit, onClose }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [searchGIF, setSearchGIF] = useState("");
    const [gifs, setGifs] = useState();   
    const [image, setImage] = useState("");
    const [owner, setOwner] = useState("");

    const handleGifSearch = async (e) => {
        e.preventDefault();
        const apiKey = import.meta.env.VITE_GIPHY_API_KEY;
        try {
            const resp = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(searchGIF)}&limit=12&rating=pg`);
            const { data } = await resp.json();
            setGifs(data.map(gif => ({
                id: gif.id,
                url: gif.images.fixed_width_small.url
        })));
        } catch (err) {
            console.error("Giphy search failed:", err);
        }
    };

    const handleGifSelect = (gifUrl) => {
        setImage(gifUrl);
        setGifs([]);      
        setSearchGIF("");    
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ title, description, imageUrl: image, owner });
        onClose();
    };

    return (
        <div id="Modal">
            <div onClick={onClose} id="Modal-overlay" />
                <div id="Modal-content">
                    <p id="Modal-close" onClick={onClose}><strong>×</strong></p>
                    <h2>Create a New Card</h2>

                    <form onSubmit={handleSubmit}>
                    <input value={title} placeholder="Card Title" onChange={e => setTitle(e.target.value)} required />

                    <input value={description} placeholder="Card Description" onChange={e => setDescription(e.target.value)} required />
                            
                    <div className="gif-form-items">
                        <input value={searchGIF} placeholder="Search GIFs" onChange={e => setSearchGIF(e.target.value)} />
                        <button type="button" onClick={handleGifSearch}> Search GIF </button>
                    </div>
                    
                    {gifs && (
                        <div className="gif-container" >
                            {gifs.map(gif => (
                                <img key={gif.id} src={gif.url} className="gif" onClick={() => handleGifSelect(gif.url)} />
                            ))}
                        </div>
                    )}

                    <input value={image} placeholder="Card Image URL" onChange={e => setImage(e.target.value)} required />

                    <input value={owner} placeholder="Card Owner (optional)" onChange={e => setOwner(e.target.value)} />

                    <button type="submit">Create Card</button>
                    </form>
                </div>
        </div>
    );
}