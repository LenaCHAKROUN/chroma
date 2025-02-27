import React, { useState, useEffect } from 'react';
import Recherche from '../Components/Recherche';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate(); // Déclare useNavigate pour la redirection

  const events = [
    {
      id: 1,
      title: 'Concert Jazz Live',
      genre: 'Musique, Concert',
      date: '2025-02-19',
      time: '20:00',
      image: 'https://i.pinimg.com/736x/f2/f0/44/f2f044e0a569e3fda79798e396797d51.jpg',
    },
    {
      id: 2,
      title: 'Projection Documentaire Nature',
      genre: 'Documentaire',
      date: '2025-02-18',
      time: '19:30',
      image: 'https://i.pinimg.com/736x/85/c6/77/85c677e7b1a7a2fda7f2a2586aa88816.jpg',
    },
    {
      id: 3,
      title: 'Atelier Cinéma Pour Enfants',
      genre: 'Atelier, Famille',
      date: '2025-02-14',
      time: '15:00',
      image: 'https://i.pinimg.com/736x/24/b8/52/24b852bfb0217498e0aa3d0343a542fb.jpg',
    },
    {
      id: 4,
      title: 'Soirée Quiz Cinéma',
      genre: 'Jeu, Soirée',
      date: '2025-02-11',
      time: '18:00',
      image: 'https://i.pinimg.com/736x/f0/bb/d7/f0bbd75fc9320c417b3fbd64d17de799.jpg',
    },
  ];

  const [selectedDate, setSelectedDate] = useState(''); // État pour la date sélectionnée
  const [isAdmin, setIsAdmin] = useState(false); // État pour vérifier si l'utilisateur est admin

  useEffect(() => {
    const loggedInEmail = localStorage.getItem('loggedInEmail');
    setIsAdmin(loggedInEmail === 'lena@gmail.com'); // Admin est défini par l'email
  }, []);

  const filteredEvents = selectedDate ? events.filter(event => event.date === selectedDate) : events;

  // Fonction pour rediriger vers Register.js
  const handleButtonClick = () => {
    navigate('/register'); // Redirige vers la page Register
  };

  const handleEdit = (eventId) => {
    navigate(`/edit1/${eventId}`); // Redirige vers Edit1.js avec l'id de l'événement
  };

  const handleDelete = (eventId) => {
    // Tu peux ajouter ta logique pour supprimer l'événement ici
    alert(`Événement ${eventId} supprimé`);
  };

  const handleAddEvent = () => {
    navigate('/add1'); // Redirige vers Add1.js
  };
  

  return (
    <div className="login">
      <Recherche onDateChange={(date) => setSelectedDate(date)} />
      <br />
      <h4 className='aff'><strong>Au Programme</strong></h4>
      <br />
      {filteredEvents.length > 0 ? (
        filteredEvents.map(event => (
          <div key={event.id} className="event">
            <img src={event.image} alt={`affiche ${event.title}`} width={140} />
            <div className="moviedescription">
              <p className="type">Edition limitée</p>
              <h3>{event.title}</h3>
              <p>{event.genre}</p>
              <p className="details">Date: {event.date}</p>
              <button onClick={handleButtonClick}>{event.time}</button>

              {isAdmin && (
                <div className="admin-actions">
                  <button onClick={() => handleEdit(event.id)}>Modifier</button>
                  <button onClick={() => handleDelete(event.id)}>Supprimer</button>
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <p className='aff'>Aucun événement ne correspond à cette date.</p>
      )}

      {isAdmin && (
        <button 
          className="add-event-button"
          onClick={handleAddEvent}
        >
          Ajouter un événement
        </button>
      )}
    </div>
  );
};

export default Login;
