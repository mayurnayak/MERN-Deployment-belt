const PetShelter = require('../models/pet.model')

module.exports = {
    // Get All
    findAllPets: (req, res) => {
        PetShelter.find()
            .then((allPets) => {
                res.status(200).json(allPets)
            })
            .catch((err) => {
                res.status(400).json(err)
            })
    },

    // Post ONE
    createPet: (req, res) => {
        PetShelter.create(req.body)
            .then((newPet) => {
                res.status(201).json(newPet)
            })
            .catch((err) => {
                res.status(400).json(err)
            })
    },

    // Get ONE 
    findonePet: (req, res) => {
        PetShelter.findOne({ _id: req.params.id })
            .then((onePet) => {
                res.status(200).json(onePet)
            })
            .catch((err) => {
                res.status(400).json(err)
            })
    },

    // Put ONE
    updatePet: (req, res) => {
        PetShelter.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
            .then((updatedPet) => {
                res.status(200).json(updatedPet)
            })
            .catch((err) => {
                res.status(400).json(err)
            })
    },

    // delete ONE
    deletePet: (req, res) => {
        PetShelter.deleteOne({ _id: req.params.id })
            .then((result) => {
                res.status(200).json(result)
            })
            .catch((err) => {
                res.status(400).json(err)
            });
    }
}