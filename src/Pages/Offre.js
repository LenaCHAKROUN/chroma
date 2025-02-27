import React, { useState } from 'react';

const Offre = () => {
  // Etat pour suivre l'état de chaque bouton de réservation (true = "Liste d'attente", false = "Réserver")
    const [reservations, setReservations] = useState({
        abonnementMensuel: false,
        abonnementAnnuel: false,
    });

    // Fonction de réservation (met à jour l'état du bouton spécifique)
    const handleReserveClick = (offer) => {
        setReservations((prev) => ({
        ...prev,
        [offer]: true,  // Met à jour l'état du bouton cliqué
        }));
    };

    return (
        <div className="offre">
        <h2 className='money'>Nos Offres Spéciales</h2>

        <div className="offer-cards">
            <div className="offer-card">
            <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIp8oNvWp3ZG2WG52rqbapRQrxDZONE6e70OopzK_tP53pBoHR8SQTBKUCoB5mf-kGU_M&usqp=CAU"
                alt="Offre"
                className="offer-image"
            />
            <div className="offer-content">
                <h3>Abonnement Mensuel</h3>
                <p className="price">15€/mois</p>
                <p>Accédez à nos contenus exclusifs chaque mois !</p>
                <ul className="features">
                <li>Accès à tous les films</li>
                <li>Réductions sur les billets</li>
                <li>Invitations aux événements spéciaux</li>
                </ul>
                {/* Le texte du bouton change en fonction de l'état spécifique */}
                <button onClick={() => handleReserveClick('abonnementMensuel')}>
                {reservations.abonnementMensuel
                    ? "Vous êtes sur la liste d'attente"
                    : "Réserver"}
                </button>
            </div>
            </div>

            <div className="offer-card">
            <img
                src="https://us.123rf.com/450wm/vectorgalaxy/vectorgalaxy1808/vectorgalaxy180807601/107097284-vecteur-d-ic%C3%B4ne-de-carte-postale-isol%C3%A9-sur-fond-blanc-pour-la-conception-de-votre-application-web-et.jpg?ver=6"
                alt="Offre"
                className="offer-image"
            />
            <div className="offer-content">
                <h3>Abonnement Annuel</h3>
                <p className="price">150€/an</p>
                <p>Accédez à tout, tout au long de l'année !</p>
                <ul className="features">
                <li>Accès illimité</li>
                <li>Tickets gratuits pour 5 films</li>
                <li>Accès anticipé aux événements</li>
                </ul>
                {/* Le texte du bouton change en fonction de l'état spécifique */}
                <button onClick={() => handleReserveClick('abonnementAnnuel')}>
                {reservations.abonnementAnnuel
                    ? "Vous êtes sur la liste d'attente"
                    : "Réserver"}
                </button>
            </div>
            </div>
        </div>
        </div>
    );
};

export default Offre;
