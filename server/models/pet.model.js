const mongoose = require('mongoose');

const PetShelterSchema = new mongoose.Schema({
    petName: {
        type: String,
        required: [true, 'Pet Name is required'],
        minlength: [3, 'come on, give a 3 characters pet name at least'],
        // Black Belt feature: - unique name
        unique: true
    },
    petType:{
        type: String,
        required: [true, 'Pet Type is required'],
        minlength:[3,'dont be lazy, define a type with 3 or more characters!']
    },
    description: {
        type: String,
        required: [true, 'description is required'],
        minlength: [3, 'show your love with 3 or more characters']
    },
    skills: {
        type: Number,
        min:[0, 'chose 0 if your dog dont have skills'],
        max:[3, 'your DOG is too skilled to be in this Pet Shelter, max 3 skiils!']
    }
}, {timestamps:true});

const PetShelter = mongoose.model('Shelter', PetShelterSchema);

module.exports = PetShelter;