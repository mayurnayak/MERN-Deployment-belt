const PetController = require('../controllers/pet.controller');

module.exports = app => {
    app.get('/api/allPets', PetController.findAllPets);
    app.post('/api/newPet', PetController.createPet);
    app.get('/api/onePet/:id', PetController.findonePet);
    app.put('/api/updatePet/:id', PetController.updatePet);
    app.delete('/api/deletePet/:id', PetController.deletePet);
}