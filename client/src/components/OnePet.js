import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './OnePet.css'

const OnePet = () => {
    const { id } = useParams()

    const navigate = useNavigate()

    const [onePet, setOnePet] = useState({})

    useEffect(() => {
        axios.get(`http://localhost:8000/api/onePet/${id}`)
            .then((res) => {
                console.log(res)
                setOnePet(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const deleteHandler = (id) => {
        axios.delete(`http://localhost:8000/api/deletePet/${id}`)
            .then((res) => {
                navigate('/')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div>
            <div className='nav'>
                <h1>Pet Shelter</h1>
                <Link to={'/'}>back to Home</Link>
            </div>
            {/* Below Nav */}
            <div className='pet-nav'>
                <h2>Details about:  {onePet.petName}</h2>
                <button onClick={() => deleteHandler(onePet._id)}>Adopt {onePet.petName}</button>
            </div>
            <div className='onePet'>
                <h2>Pet Name: {onePet.petName}</h2>
                <h3>Pet Type: {onePet.petType}</h3>
                <h3>Description: {onePet.description}</h3>
                <h3>Skiils: {onePet.skills}</h3>
                <br />
            </div>
        </div>
    );
}

export default OnePet;
