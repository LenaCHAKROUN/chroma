import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import Notification from '../../Components/Notification/Notification';
import { login } from '../JS/Actions/user';
import './connexion.css';

const Connexion = () => {
    const [user, setUser] = useState({})
    // const errors = useSelector((state) => state.userReducer.errors);
    // const isAuth = useSelector((state) => state.userReducer.isAuth);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value})
    }

    const handleUser = (e) => {
        e.preventDefault();
        dispatch(login(user))
        navigate('/')
        
    }
    return (
        <div className='loogin'>
            <h1>Login User</h1>
            {/* {errors && errors.map((el) => <Notification error={el} />)} */}
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" name="email" onChange={handleChange} />
            <Form.Label>Password</Form.Label>
            <Form.Control type="text" placeholder="Enter password" name="password" onChange={handleChange} />
            <Button className='btn-login' variant="primary" type="submit" onClick={handleUser}>Login</Button>
        </div>
    )
}

export default Connexion