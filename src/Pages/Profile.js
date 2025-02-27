import React, { useState, useEffect } from 'react';
import { Button, Form, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        photo: 'https://via.placeholder.com/150', // Photo par défaut
    });
    const [newPhoto, setNewPhoto] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const loggedInEmail = localStorage.getItem('loggedInEmail');
        if (loggedInEmail) {
            const loggedInUser = JSON.parse(localStorage.getItem(loggedInEmail));
            if (loggedInUser) {
                setUser(loggedInUser);
            }
        } else {
            navigate('/'); // Rediriger vers la page d'accueil si l'utilisateur n'est pas connecté
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('loggedInEmail');
        navigate('/'); // Rediriger vers la page d'accueil après déconnexion
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setNewPhoto(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedUser = { 
            ...user, 
            photo: newPhoto || user.photo, // Si pas de nouvelle photo, garder celle existante 
        };
        localStorage.setItem(user.email, JSON.stringify(updatedUser)); 
        localStorage.setItem('loggedInEmail', user.email); 
        setUser(updatedUser);
        setIsEditing(false);
    };

    return (
        <div className="profile-container">
            <h1>Profil de {user.firstName} {user.lastName}</h1>

            {isEditing ? (
                <Form onSubmit={handleSubmit} className="profile-form">
                    <div className="profile-picture">
                        <Image
                            src={newPhoto || user.photo}
                            alt="Photo de profil"
                            roundedCircle
                            width={120}
                            height={120}
                        />
                        <input type="file" onChange={handlePhotoChange} />
                    </div>
                    <Form.Group className="mb-3">
                        <Form.Label>Nom</Form.Label>
                        <Form.Control
                            type="text"
                            value={user.firstName}
                            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Prénom</Form.Label>
                        <Form.Control
                            type="text"
                            value={user.lastName}
                            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            value={user.email}
                            readOnly
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">Sauvegarder</Button>
                </Form>
            ) : (
                <div className="profile-info">
                    <div className="profile-picture">
                        <Image
                            src={user.photo}
                            alt="Photo de profil"
                            roundedCircle
                            width={120}
                            height={120}
                        />
                    </div>
                    <p><strong>Nom :</strong> {user.firstName}</p>
                    <p><strong>Prénom :</strong> {user.lastName}</p>
                    <p><strong>Email :</strong> {user.email}</p>
                    <Button variant="secondary" onClick={() => setIsEditing(true)}>Modifier</Button>
                </div>
            )}

            <div className="logout-container">
                <Button variant="danger" onClick={handleLogout}>Déconnexion</Button>
            </div>
        </div>
    );
};

export default Profile;

