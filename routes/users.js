const express = require('express');
const createUser = require( '../controllers/route1.js')
const  getUser = require ('../controllers/route2.js')
const deleteUser = require( '../controllers/route3.js')
const  updateUser =  require('../controllers/route4.js')
const router = express.Router();



router.post('/',createUser);
router.get('/',getUser)
router.delete('/:slno',deleteUser)
router.patch('/:slno',updateUser)






module.exports =  router;