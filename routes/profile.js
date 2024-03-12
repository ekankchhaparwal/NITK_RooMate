const express = require('express')
const router = express.Router();
const connection = require('../database');

router.post('/' , (req, res) => {
    const email = req.body.email;
    const query= `SELECT STUDENT.NAME, STUDENT.EMAIL, STUDENT.CONTACT_NUMBER, STUDENT.STUDENT_ID, STUDENT.GENDER, STUDENT.ROOM_SWAP_AVAILABLE_FLAG,
    ROOM.BUILDING_NAME, ROOM.ROOM_NUMBER, ROOM.FLOOR_NO, ROOM.WING FROM STUDENT INNER JOIN ROOM ON STUDENT.ROOM_ID = ROOM.ROOM_ID WHERE STUDENT.EMAIL = ?`;
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

module.exports = router;