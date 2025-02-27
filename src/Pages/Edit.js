import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Edit.css';

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movieData, setMovieData] = useState({
    title: '',
    genre: '',
    image: '',
    trailerUrl: '',
    dates: '',
    time: ''
  });
  
  const [ setRefresh] = useState(false);  // Ajout de l'état `refresh` pour forcer un re-render

  useEffect(() => {
    const movies = JSON.parse(localStorage.getItem('movies')) || [];
    const movieToEdit = movies.find(movie => movie.id === parseInt(id));

    if (movieToEdit) {
      setMovieData(movieToEdit);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleConfirm = () => {
    if (
      !movieData.title ||
      !movieData.genre ||
      !movieData.image ||
      !movieData.trailerUrl ||
      !movieData.dates ||
      !movieData.time
    ) {
      alert("Tous les champs doivent être remplis !");
      return;
    }

    const movies = JSON.parse(localStorage.getItem('movies')) || [];
    
    // Mise à jour du film avec les nouvelles données
    const updatedMovies = movies.map(movie => 
      movie.id === parseInt(id) ? { ...movie, ...movieData } : movie
    );

    // Sauvegarde dans localStorage
    localStorage.setItem('movies', JSON.stringify(updatedMovies));
    
    // Forcer un re-render en changeant l'état `refresh`
    setRefresh(prev => !prev);  // Cela va déclencher un re-render

    // Redirection vers la page précédente
    navigate('/');
  };

  return (
    <div className="edit">
      <h2>Modifier le film</h2>
      <form onSubmit={(e) => e.preventDefault()} className="edit-form">
        <div className="form-group">
          <label htmlFor="title">Nom du film:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={movieData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="genre">Type:</label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={movieData.genre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">URL du poster:</label>
          <input
            type="url"
            id="image"
            name="image"
            value={movieData.image}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="trailerUrl">URL du trailer:</label>
          <input
            type="url"
            id="trailerUrl"
            name="trailerUrl"
            value={movieData.trailerUrl}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dates">Dates:</label>
          <input
            type="text"
            id="dates"
            name="dates"
            value={movieData.dates}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="time">Heure:</label>
          <input
            type="text"
            id="time"
            name="time"
            value={movieData.time}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-buttons">
          <button type="button" onClick={() => navigate(-1)} className="back-btn">Retour</button>
          <button type="button" onClick={handleConfirm} className="confirm-btn">Confirmer</button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
