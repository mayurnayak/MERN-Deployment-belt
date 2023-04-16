import { useState, useEffect } from 'react';
import React from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import './Display.css'

const Display = (props) => {
    const [allPets, setAllPets] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8000/api/allPets')
            .then((res) => {
                console.log(res)
                // setAllPets(res.data)

                // Black Belt feature
                const sortedPets = res.data.sort((a, b) => a.petType.localeCompare(b.petType));
                setAllPets(sortedPets);
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const deleteHandler = (id) => {
        console.log(id)
        axios.delete(`http://localhost:8000/api/deletePet/${id}`)
            .then((res) => {
                const updatedPet = allPets.filter((pet) => pet._id !== id)
                setAllPets(updatedPet)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Black Belt feature
    const likeHandler = (id) => {
        // Disable the like button until the component reloads
        const updatedPets = allPets.map(pet => {
            if (pet._id === id) {
                return { ...pet, isLiked: true }
            } else {
                return pet
            }
        })
        setAllPets(updatedPets)
    }

    return (
        <div>
            <div className='nav'>
                <h1>Pet Shelter</h1>
                <Link to={'/createPet/form'}>Add a pet to the shelter</Link>
            </div>
            {/* Below Nav */}

            <h2 className='listing'>These pets are looking for a good home</h2>
            <div className="pet-container">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allPets.map((pet) => (
                            <tr className='pet-info' key={pet._id}>
                                <td>{pet.petName}</td>
                                <td>{pet.petType}</td>
                                <td>
                                    <Link to={`/onePet/${pet._id}`}>Details</Link>
                                    <Link to={`/editPet/${pet._id}`}>Edit</Link>
                                    <button onClick={() => deleteHandler(pet._id)}>Adopt</button>
                            {/* Black Belt feature */}
                                    <button className='like-btn'
                                        onClick={() => likeHandler(pet._id)}
                                        disabled={pet.isLiked}>
                                        {pet.isLiked ? "Liked! ❤️" : "Like"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Display;