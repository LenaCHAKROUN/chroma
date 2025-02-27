import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Add.css';

const Add = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [dates, setDates] = useState('');
  const [time, setTime] = useState('');
  const [image, setImage] = useState('');
  const [trailerUrl, setTrailerUrl] = useState('');

  const handleAddMovie = () => {
    if (!title || !genre || !dates || !time || !image || !trailerUrl) {
      alert("Tous les champs doivent être remplis !");
      return;
    }

    const newMovie = {
      id: Date.now(),
      title,
      genre,
      dates: dates.split(',').map(date => date.trim()),
      time,
      image,
      trailerUrl,
    };

    const savedMovies = JSON.parse(localStorage.getItem('movies')) || [];
    savedMovies.push(newMovie);
    localStorage.setItem('movies', JSON.stringify(savedMovies));

    navigate('/');
  };

  return (
    <div className="add-movie">
      <h2>Ajouter un evenement</h2>
      <form onSubmit={(e) => e.preventDefault()} className="add-form">
        <div className="form-group">
          <label htmlFor="title">Titre</label>
          <input 
            type="text" 
            id="title"
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="genre">Genre</label>
          <input 
            type="text" 
            id="genre"
            value={genre} 
            onChange={(e) => setGenre(e.target.value)} 
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dates">Dates</label>
          <input 
            type="text" 
            id="dates"
            value={dates} 
            onChange={(e) => setDates(e.target.value)} 
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="time">Heure</label>
          <input 
            type="text" 
            id="time"
            value={time} 
            onChange={(e) => setTime(e.target.value)} 
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">URL du poster</label>
          <input 
            type="url" 
            id="image"
            value={image} 
            onChange={(e) => setImage(e.target.value)} 
            required
          />
        </div>
        

        <div className="form-buttons">
          <button type="button" onClick={() => navigate(-1)} className="back-btn">Retour</button>
          <button type="button" onClick={handleAddMovie} className="confirm-btn">Confirmer</button>
        </div>
      </form>
    </div>
  );
};

export default Add;
