import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Reservation.css';

const Reservation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { movie, salle } = location.state;

  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [timer, setTimer] = useState(null);
  const [reservationStatus, setReservationStatus] = useState(null);

  useEffect(() => {
    // Charger les sièges depuis le stockage local ou initialiser
    const savedSeats = JSON.parse(localStorage.getItem(`seats_${salle}`)) || [];
    if (savedSeats.length > 0) {
      setSeats(savedSeats);
    } else {
      const initialSeats = Array.from({ length: 30 }, (_, index) => ({
        seatNumber: String.fromCharCode(65 + Math.floor(index / 6)) + ((index % 6) + 1),
        available: true,
      }));
      setSeats(initialSeats);
      localStorage.setItem(`seats_${salle}`, JSON.stringify(initialSeats));
    }
  }, [salle]);

  const handleSeatSelection = (seat) => {
    if (seat.available) {
      setSelectedSeats((prev) =>
        prev.includes(seat.seatNumber)
          ? prev.filter((s) => s !== seat.seatNumber)
          : [...prev, seat.seatNumber]
      );
    }
  };

  const handleReserve = () => {
    if (selectedSeats.length > 0) {
      const updatedSeats = seats.map((seat) =>
        selectedSeats.includes(seat.seatNumber) ? { ...seat, available: false } : seat
      );
      setSeats(updatedSeats);
      localStorage.setItem(`seats_${salle}`, JSON.stringify(updatedSeats));
      setReservationStatus(`Réservé - Sièges: ${selectedSeats.join(', ')}`);
      setSelectedSeats([]);
      startTimer();
    } else {
      setReservationStatus('Veuillez choisir au moins un siège.');
    }
  };

  const startTimer = () => {
    setTimer(3 * 60 * 60); // 3 heures en secondes
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setReservationStatus('Annulée - Temps écoulé');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="reservation-page">
      <h1>Réservez en ligne et évitez la file d'attente!</h1>
      <h3>Film : {movie.title}</h3>
      <h4>Salle n°4 {salle}</h4>
      <div className="seat-selection">
        <h4>Choisissez vos sièges</h4>
        <div className="seats-layout">
          {[...new Set(seats.map((s) => s.seatNumber[0]))].map((row) => (
            <div key={row}>
              <h5 className="row-label">Rangée {row}</h5>
              <div className="seats-row">
                {seats.filter((s) => s.seatNumber.startsWith(row)).map((seat) => (
                  <button
                    key={seat.seatNumber}
                    className={`seat ${seat.available ? 'available' : 'occupied'} ${selectedSeats.includes(seat.seatNumber) ? 'selected-multiple' : ''}`}
                    onClick={() => handleSeatSelection(seat)}
                    disabled={!seat.available}
                  >
                    {seat.seatNumber}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {timer !== null && (
        <div className="timer">
          <p>Temps restant pour payer : {formatTime(timer)}</p>
        </div>
      )}
      <button className="reserve-button" onClick={handleReserve} disabled={selectedSeats.length === 0}>
        Réserver
      </button>
      <div className="reservation-status">
        {reservationStatus && <p>{reservationStatus}</p>}
      </div>
      <p className="payment-info">
        Le paiement doit être effectué en caisse dans un délai de 3 heures, sinon la réservation sera annulée.
      </p>
      <button className="back-button" onClick={() => navigate(-1)}>Retour</button>
    </div>
  );
};

export default Reservation;
