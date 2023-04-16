import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const EditPet = () => {

    const { id } = useParams()

    const navigate = useNavigate()

    const [pet, setPet] = useState({
        petName: '',
        petType: '',
        description: '',
        skills: 0,
        explicit: false
    })

    // Black Belt feature: - validation when updating
    const [errors, setErrors] = useState({})

    const changeHandler = (e) => {
        setPet({ ...pet, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        axios.get(`http://localhost:8000/api/onePet/${id}`)
            .then((res) => {
                console.log(res.data)
                setPet(res.data)

            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const submitHandler = (e) => {
        e.preventDefault()

        axios.put(`http://localhost:8000/api/updatePet/${id}`, pet)
            .then((res) => {
                console.log(res)
                navigate('/')
            })
            .catch((err) => {
                console.log(err)
                setErrors(err.response.data.errors)
            })

            
    }

    return (
        <div>
            <div className='nav'>
                <h1>Pet Shelter</h1>
                <Link to={'/'}>back to Home</Link>
            </div>
            {/* Below Nav */}
            <div>
                <h2>Edit {pet.petName}</h2>

                <form onSubmit={submitHandler}>

                    <label>Pet Name:</label>
                    <input type="text" onChange={changeHandler} value={pet.petName} name='petName' />
                    {
                        errors.petName ?
                            <p>{errors.petName.message}</p> :
                            null
                    }

                    <label>Pet Type:</label>
                    <input type="text" onChange={changeHandler} value={pet.petType} name='petType' />
                    {
                        errors.petType ?
                            <p>{errors.petType.message}</p> :
                            null
                    }

                    <label>Description:</label>
                    <input type="text" onChange={changeHandler} value={pet.description} name='description' />
                    {
                        errors.description ?
                            <p>{errors.description.message}</p> :
                            null
                    }

                    <label >Skills:</label>
                    <input type="number" onChange={changeHandler} value={pet.skills} name='skills' />
                    {
                        errors.skills ?
                            <p>{errors.skills.message}</p> :
                            null
                    }
                    <br />

                    <button className='List-btn'>Edit Pet</button>
                </form>

            </div>
        </div>
    );
}

export default EditPet;
