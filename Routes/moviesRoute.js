const express = require('express')
const moviesController = require('./../Controllers/moviesController')

const router = express.Router()

router.param('id', moviesController.checkId);

// app.use('/api/v1/movies',)

router.route('/')
    .get(moviesController.getAllMovies)
    .post(moviesController.validateBody, moviesController.addMovie)

router.route('/:id')
    .get(moviesController.getSingleMovie)
    .patch(moviesController.updateMovie)
    .delete(moviesController.delteMovie)

module.exports = router;