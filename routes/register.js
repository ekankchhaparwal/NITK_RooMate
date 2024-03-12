const express = require('express')
const router = express.Router();
const connection = require('../database');

router.post('/login', (req, res) => {
   
    const email = req.body.email;
    const givenPassword = req.body.passcode;

    const checkQuery = `SELECT passcode FROM authorization WHERE email = "${email}";`;
    

    connection.query(checkQuery, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            return results;
        } else if (results.length === 0) {
            return res.status(401).json({ status: 'email is invalid' });
        } else if (givenPassword !== results[0].passcode) {
            return res.status(401).json({ status: 'Incorrect paasword' });
        }
        
        res.status(200).json({ status: 'Login successfull' });
    });
});



module.exports = router;