const express = require('express');
const router = express.Router();
const notesController = require("../controllers/notesController");
const { ensureAuth, ensureGuest } = require('../middleware/authorize');


router.get('/', ensureGuest, notesController.login);
router.get('/dashboard', ensureAuth, notesController.getAllNotes);
router.get('/addnote', ensureAuth, notesController.addnote);
router.post('/addnote', notesController.createnote);
router.get('/edit/:id', ensureAuth, notesController.editNote);
router.post('/update/:id', ensureAuth, notesController.updateNote);
router.post('/delete/:id', ensureAuth, notesController.deleteNote);
router.get('/show/:id', ensureAuth, notesController.showNote);
router.post('/searchResults', ensureAuth, notesController.searchresults);





module.exports = router;