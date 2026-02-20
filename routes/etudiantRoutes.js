// Importer Express et créer un routeur
const express = require('express');
const router = express.Router();

// Importer toutes les fonctions du contrôleur
const {
    getAllEtudiants,
    getEtudiantById,
    createEtudiant,
    updateEtudiant,
    deleteEtudiant,
    getEtudiantsByFiliere,
    searchEtudiants,
    getEtudiantsDesactives
} = require('../controllers/etudiantController');

// ============================================
// DÉFINITION DES ROUTES
// ============================================

// Route:  /api/etudiants
// GET  → Liste tous les étudiants
// POST → Crée un nouvel étudiant
router.route('/')
    .get(getAllEtudiants)
    .post(createEtudiant);

// ⚠️ IMPORTANT:  Cette route DOIT être avant /: id
// Sinon "filiere" serait interprété comme un ID
router.get('/filiere/:filiere', getEtudiantsByFiliere);



router.get('/desactivate',getEtudiantsDesactives);






//🔹 Query parameters
//Why /search?q=ahmed is better than /search/:q
//❌ If we used route params
//GET /api/etudiants/search/ahmed

//Problems:
//Harder to extend later
//(what if you want prenom, nom, pagination, etc.)

//Not standard REST practice for search

//Less flexible
// search doit être avant /:id, sinon Express va confondre search avec un ID.
router.get('/search', searchEtudiants);


// Route: /api/etudiants/:id
// GET    → Récupère un étudiant par ID
// PUT    → Modifie un étudiant
// DELETE → Supprime un étudiant
router.route('/:id')
    .get(getEtudiantById)
    .put(updateEtudiant)
    .delete(deleteEtudiant);


// Exporter le routeur
module.exports = router;