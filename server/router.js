//creating a simple router
const express = require('express');
const router = express.Router();

//creating a get request to a root rout
router.get('/', (req, res) => {
    res.send('server is up and running');
})

//we export the router to the index.js
module.exports = router;