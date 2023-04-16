import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreatePet.css'

const CreatePet = () => {

    const navigate = useNavigate()

    const [pet, setPet] = useState({
        petName: '',
        petType: '',
        description: '',
        skills: 0,
        explicit: false
    })

    const [errors, setErrors] = useState({})

    const changeHandler = (e) => {
        if (e.target.name === 'explicit') {
            setPet({ ...pet, explicit: !pet.explicit })
        }
        else {
            setPet({ ...pet, [e.target.name]: e.target.value })
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()

        // axios.post('http://localhost:8000/api/newPet', pet)
        //     .then((res) => {
        //         console.log(res)
        //         navigate('/')
        //     })
        //     .catch((err) => {
        //         console.log(err)
        //         setErrors(err.response.data.errors)
        //     })


        // Black Belt feature: - checking unique name when adding it to database
        axios.get('http://localhost:8000/api/allPets')
            .then((res) => {
                const petNames = res.data.map(pet => pet.petName)
                if (petNames.includes(pet.petName)) {
                    setErrors({ petName: { message: 'This pet name already exists' } })
                } else {
                    axios.post('http://localhost:8000/api/newPet', pet)
                        .then((res) => {
                            console.log(res)
                            navigate('/')
                        })
                        .catch((err) => {
                            console.log(err)
                            setErrors(err.response.data.errors)
                        })
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div>
            <div className='nav'>
                <h1>Pet Shelter</h1>
                <Link to={'/'}>Home</Link>
            </div>
      {/* Below Nav */}
            <div>
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

                    <label>Explicit?</label>
                    <input type="checkbox" name="explicit" onChange={changeHandler} value={pet.explicit} />
                    {
                        errors.explicit ?
                            <p>{errors.explicit.message}</p> :
                            null
                    }

                    <br />

                    <button className='List-btn'>List Pet</button>
                </form>
            </div>

        </div>
    );
}

export default CreatePet;
