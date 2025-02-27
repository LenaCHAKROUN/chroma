import React, { useEffect, useState } from 'react'

const Ticket = () => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        // Récupérer les données de l'utilisateur depuis le localStorage
        const storedUser = JSON.parse(localStorage.getItem('user'))
        if (storedUser) {
        setUser(storedUser)
        }
    }, [])

    if (!user) {
        return <p>Aucune donnée utilisateur trouvée</p>
    }

    return (
        <div className="ticket-wrapper">
    <div className="ticket">
        <div className="ticket-header">
        Ticket de Cinéma
        </div>
        <div className="ticket-content">
        <div className="ticket-detail">
            <span>Nom:</span> <span>{user.name}</span>
        </div>
        <div className="ticket-detail">
            <span>Email:</span> <span>{user.email}</span>
        </div>
        <div className="ticket-detail">
            <span>Mot de passe:</span> <span>{user.password}</span>
        </div>
        <div className="ticket-detail">
            <span>Téléphone:</span> <span>{user.phone}</span>
        </div>
        </div>
        <button className="ticket-button">Confirmé</button>
        <div className="ticket-note">
        N'oubliez pas d'emmener votre ticket avec vous pour accéder à la séance !
        </div>
    </div>
</div>

    )
}

export default Ticket
