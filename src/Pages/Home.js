import React, { useState, useEffect } from 'react';
import Recherche1 from '../Components/Recherche1';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const movies = [
    {
      "id": 16,
      "title": "Casablanca",
      "genre": "Drame, Romance, Guerre",
      "dates": ["2025-02-25", "2025-02-14"],
      "time": "19:00",
      "image": "https://i.pinimg.com/736x/3d/68/8c/3d688c0354db58139ad4413e8f1eef79.jpg",
      "trailerUrl": "https://www.youtube.com/watch?v=66Zvg0YW870&t=12s"
    },
    {
      "id": 17,
      "title": "Gone with the Wind",
      "genre": "Drame, Romance, Histoire",
      "dates": ["2025-02-22", "2025-02-11"],
      "time": "14:00",
      "image": "https://m.media-amazon.com/images/S/pv-target-images/24868c8a893683660f9a80f390319c7374cb7679ba363423a117f00e28b9576c.jpg",
      "trailerUrl": "https://www.youtube.com/watch?v=0X94oZgJis4"
    },
    {
      "id": 18,
      "title": "Lawrence of Arabia",
      "genre": "Aventure, Drame, Histoire",
      "dates": ["2025-02-20", "2025-02-15"],
      "time": "18:30",
      "image": "https://img.kingandmcgaw.com/imagecache/4/3/si-431902.jpg_ihcm-60.00_iwcm-39.38_fls-880617L.tif_fts-880617T.tif_mc-_fwcm-1.90_maxdim-1000_en_easyart___iar-1.jpg",
      "trailerUrl": "https://www.youtube.com/watch?v=vOlRhGEhG7k"
    },
    {
      "id": 19,
      "title": "Doctor Zhivago",
      "genre": "Drame, Romance, Guerre",
      "dates": ["2025-02-18", "2025-02-10"],
      "time": "17:45",
      "image": "https://i.pinimg.com/736x/d8/ce/8e/d8ce8e4a3c2a15336e5509c5a7935fa9.jpg",
      "trailerUrl": "https://www.youtube.com/watch?v=CGGr21PilKY"
    },
    {
      "id": 20,
      "title": "The Bridge on the River Kwai",
      "genre": "Guerre, Drame, Aventure",
      "dates": ["2025-02-27", "2025-02-19"],
      "time": "16:00",
      "image": "https://upload.wikimedia.org/wikipedia/commons/3/34/The_Bridge_on_the_River_Kwai_%281958_US_poster_-_Style_B%29.jpg",
      "trailerUrl": "https://www.youtube.com/watch?v=RlC7XBayj0s"
    }
  ];

  const [selectedDate, setSelectedDate] = useState('');
  const [comment, setComment] = useState('');
  const [movieComments, setMovieComments] = useState({});
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isBlurred, setIsBlurred] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const savedComments = JSON.parse(localStorage.getItem('movieComments')) || {};
    setMovieComments(savedComments);
    const loggedInEmail = localStorage.getItem('loggedInEmail');
    setIsAdmin(loggedInEmail === 'lena@gmail.com');
  }, []);

  const filteredMovies = selectedDate ? movies.filter(movie => movie.dates.includes(selectedDate)) : movies;

  const handleButtonClick = (movie) => {
    setSelectedMovie(movie);
    setIsBlurred(true);
  };

  const handleCloseDetails = () => {
    setSelectedMovie(null);
    setIsBlurred(false);
  };

  const handleReserve = (movie) => {
    navigate('/reservation', { state: { movie } });
  };

  const handleCommentSubmit = (movieId) => {
    if (comment.trim()) {
      const updatedComments = {
        ...movieComments,
        [movieId]: [...(movieComments[movieId] || []), comment],
      };
      setMovieComments(updatedComments);
      localStorage.setItem('movieComments', JSON.stringify(updatedComments));
      setComment('');
    }
  };

  const handleDelete = (movieId) => {
    const updatedMovies = movies.filter(movie => movie.id !== movieId);
    localStorage.setItem('movies', JSON.stringify(updatedMovies));
    setIsBlurred(false);
  };

  const handleEdit = (movieId) => {
    navigate(`/edit/${movieId}`);
  };

  const handleAddMovie = () => {
    navigate('/add');
  };

  return (
    <div className="home">
      <Recherche1 onDateChange={(date) => setSelectedDate(date)} />
      <h4 className='aff'><strong>A l'affiche</strong></h4>

      {filteredMovies.length > 0 ? (
        filteredMovies.map(movie => (
          <div key={movie.id} className='event'>
            <div className='movie'>
              <a href={movie.trailerUrl} target="_blank" rel="noopener noreferrer">
                <img src={movie.image} alt={`affiche ${movie.title}`} className="movie-poster" />
              </a>
              <div className='moviedescription'>
                <p className='type'>Classiques</p>
                <h3>{movie.title}</h3>
                <p>{movie.genre}</p>
                <p className='details'>{movie.dates.join(', ')}</p>
                <div className="movie-actions">
                  <button onClick={() => handleButtonClick(movie)}>{movie.time}</button>
                  {isAdmin && (
                    <>
                      <button onClick={() => handleEdit(movie.id)}>Modifier</button>
                      <button onClick={() => handleDelete(movie.id)}>Supprimer</button>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="icon-container">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Écrivez un commentaire..."
                className="comment-textarea"
              />
              <button onClick={() => handleCommentSubmit(movie.id)} className="comment-submit">
                Soumettre le commentaire
              </button>
              <div className="comments-section">
                {movieComments[movie.id] && movieComments[movie.id].map((comm, index) => (
                  <p key={index} className="comment">{comm}</p>
                ))}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className='aff'>Aucun film ne correspond à cette date.</p>
      )}

      {isBlurred && <div className="blur-background"></div>}

      {selectedMovie && (
        <div className="movie-details-card">
          <button className="close-button" onClick={handleCloseDetails}>X</button>
          <div className="movie-details-content">
            <img src={selectedMovie.image} alt={`affiche ${selectedMovie.title}`} className="movie-poster-in-card" />
            <h3>{selectedMovie.title}</h3>
            <p>{selectedMovie.genre}</p>
            <p>Date(s) : {selectedMovie.dates.join(', ')}</p>
            <p>Heure : {selectedMovie.time}</p>
            <button onClick={() => handleReserve(selectedMovie)}>Reserver</button>
          </div>
        </div>
      )}

      {/* Button to add a movie */}
      {isAdmin && (
        <button 
          className="add-movie-button"
          onClick={handleAddMovie}
        >
          Ajouter un film
        </button>
      )}
    </div>
  );
};

export default Home;









