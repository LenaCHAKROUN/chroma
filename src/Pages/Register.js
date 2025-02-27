import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaUsers } from 'react-icons/fa';


const MAX_PLACES = 70;
const RESERVATION_TIME = 3 * 60 * 60; // 3 heures en secondes


const Register = () => {
  const [newUser, setNewUser] = useState({});
  const [remainingPlaces, setRemainingPlaces] = useState(
    parseInt(localStorage.getItem('remainingPlaces')) || MAX_PLACES
  );
  const [timer, setTimer] = useState(
    parseInt(localStorage.getItem('reservationTimer')) || RESERVATION_TIME
  );
  const [reservationStatus, setReservationStatus] = useState(null);  // Nouveau state pour la réservation
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('reservationTimer', RESERVATION_TIME);
  }, []);

  useEffect(() => {
    if (timer > 0 && reservationStatus === 'reserved') {  // Vérifie si la réservation est effectuée
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            localStorage.removeItem('reservationTimer');
            return 0;
          }
          localStorage.setItem('reservationTimer', prev - 1);
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer, reservationStatus]);  // Dépend de reservationStatus pour déclencher le compte à rebours

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleReserve = (e) => {
    e.preventDefault();
    const placesToReserve = parseInt(newUser.places) || 0;
    if (placesToReserve > remainingPlaces || placesToReserve <= 0) {
      alert('Nombre de places invalide');
      return;
    }

    setRemainingPlaces(remainingPlaces - placesToReserve);
    localStorage.setItem('remainingPlaces', remainingPlaces - placesToReserve);
    setReservationStatus('reserved');  // Mise à jour du statut de la réservation
    setTimer(RESERVATION_TIME);  // Réinitialisation du timer
    localStorage.setItem('reservationTimer', RESERVATION_TIME);
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="register" style={{ textAlign: 'center' }}>
      <img src="https://cdn-icons-png.flaticon.com/512/5589/5589071.png" alt="logo" width={60} style={{ marginBottom: '20px' }} />
      <h3 style={{ marginBottom: '20px', fontWeight: 'bold', fontSize: '1.3rem' }}>Réservez votre place en ligne !</h3>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
        <FaUsers size={30} color="#e63946" />
        <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{remainingPlaces} places restantes</span>
      </div>
      
      <Form style={{ maxWidth: '500px', margin: '20px auto', padding: '20px', backgroundColor: '#f4f4f4', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}>
        <Form.Label>Nom</Form.Label>
        <Form.Control type="text" name="name" onChange={handleChange} required />

        <Form.Label>Email</Form.Label>
        <Form.Control type="email" name="email" onChange={handleChange} required />

        <Form.Label>Téléphone</Form.Label>
        <Form.Control type="number" name="phone" onChange={handleChange} required />

        <Form.Label>Nombre de places</Form.Label>
        <Form.Control type="number" name="places" onChange={handleChange} required />

        <Button variant="primary" onClick={handleReserve} style={{ width: '100%', marginTop: '15px', backgroundColor: '#e63946', border: 'none', padding: '10px', fontWeight: 'bold', textTransform: 'uppercase' }}>Réserver</Button>
        {reservationStatus === 'reserved' && timer > 0 && (
        <div className="timer">
          <p style={{ color: 'red', fontWeight: 'bold' }}>Temps restant pour payer : {formatTime(timer)}</p>
        </div>
      )}
      <br/>
      <p className="payment-info">
        Le paiement doit être effectué en caisse dans un délai de 3 heures, sinon la réservation sera annulée.
      </p>
      
      <button className="back-button" onClick={() => navigate(-1)} style={{ marginTop: '10px', padding: '10px', backgroundColor: '#ccc', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Retour</button>
      </Form>
      
      
    </div>
  );
};

export default Register;
