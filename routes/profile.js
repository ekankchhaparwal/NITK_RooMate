const express = require('express')
const router = express.Router();
const connection = require('../database');

router.get('/' , (req, res) => {
    const email = req.body.email;
    const query= `SELECT STUDENT.NAME, STUDENT.EMAIL, STUDENT.CONTACT_NUMBER, STUDENT.STUDENT_ID, STUDENT.GENDER, STUDENT.ROOM_SWAP_AVAILABLE_FLAG,
    ROOM.ROOM_ID, ROOM.BUILDING_NAME, ROOM.FLOOR_NO, ROOM.WING FROM STUDENT INNER JOIN ROOM ON STUDENT.ROOM_ID = ROOM.ROOM_ID WHERE STUDENT.EMAIL = ?`;
    connection.query(query, email, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).send('Error fetching data');
            return;
        }
        res.status(200).json(results);
    });
}
);

router.get('/name', (req, res) => {
    // Check if user is logged in
    if (req.session.user) {
        // If user is logged in, retrieve user information from session
        const user = req.session.user;
        const emailId = user['email']
        const query = `select name from STUDENT where email = '${emailId}' ;`
        connection.query(query,(err,results) =>{
            if (err) {
                console.error('Error fetching data:', err);
                res.status(500).send('Error fetching data');
                return;
            }
            res.status(200).json(results[0]);
        })
        
    }
});

module.exports = router;