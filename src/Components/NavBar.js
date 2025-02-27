import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, Modal, Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
    const [showModal, setShowModal] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const loggedInEmail = localStorage.getItem('loggedInEmail');
        setIsLoggedIn(!!loggedInEmail);
        setIsAdmin(loggedInEmail === 'lena@gmail.com');
    }, [isLoggedIn]);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isLogin) {
            const storedUser = JSON.parse(localStorage.getItem(email));
            if (storedUser && storedUser.password === password) {
                localStorage.setItem('loggedIn', true);
                localStorage.setItem('loggedInEmail', email);
                setIsLoggedIn(true);
                setIsAdmin(email === 'lena@gmail.com');
                navigate('/profile');
            } else {
                alert('Email ou mot de passe incorrect');
            }
        } else {
            if (localStorage.getItem(email)) {
                alert('Cet email est déjà utilisé');
            } else {
                localStorage.setItem(email, JSON.stringify({ email, password }));
                alert('Compte créé avec succès!');
                setIsLogin(true);
            }
        }

        handleClose();
    };

    const handleLogout = () => {
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('loggedInEmail');
        setIsLoggedIn(false);
        setIsAdmin(false);
        navigate('/');
    };

    return (
        <div>
            <Navbar bg="black" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        <img src="https://us.123rf.com/450wm/photoart23d/photoart23d1705/photoart23d170500368/79144086-lettre-c-arrondi-or-brillant-isol%C3%A9-sur-fond-noir.jpg" alt="img" width={50} />
                    </Navbar.Brand>
                    <Navbar.Brand as={Link} to="/">Chroma</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Cinema</Nav.Link>
                        <Nav.Link as={Link} to="/login">Événements</Nav.Link>
                        <Nav.Link as={Link} to="/offre">Offres</Nav.Link>
                    </Nav>

                    {isLoggedIn ? (
                        <>
                            <Button variant="outline-light" onClick={() => navigate('/profile')}>
                                Mon Profil
                            </Button>
                            <Button variant="outline-light" onClick={handleLogout} style={{ marginLeft: '10px' }}>
                                Déconnexion
                            </Button>
                        </>
                    ) : (
                        <Button className="btn-connexion" onClick={handleShow} variant="outline-light">Connexion</Button>
                    )}
                </Container>
            </Navbar>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{isLogin ? 'Se connecter' : 'Créer un compte'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Entrez votre email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Mot de passe</Form.Label>
                            <Form.Control type="password" placeholder="Entrez votre mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            {isLogin ? 'Se connecter' : 'Créer un compte'}
                        </Button>
                    </Form>
                    <div className="mt-3">
                        <Button variant="link" onClick={() => setIsLogin(!isLogin)}>
                            {isLogin ? 'Pas de compte ? Créer un compte' : 'Déjà un compte ? Se connecter'}
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default NavBar;

