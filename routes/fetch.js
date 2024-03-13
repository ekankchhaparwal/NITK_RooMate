const express = require('express')
const router = express.Router();
const connection = require('../database');

router.get('/', (req, res) => {
    const user = req.session.user;
    const email = user['email'];

    let filterQuery = `
        SELECT  
            STUDENT.STUDENT_ID, 
            STUDENT.NAME, 
            STUDENT.EMAIL, 
            STUDENT.CONTACT_NUMBER, 
            STUDENT.GENDER, 
            ROOM.BUILDING_NAME, 
            ROOM.FLOOR_NO, 
            ROOM.WING, 
            ROOM.ROOM_NUMBER
        FROM 
            ROOM 
        INNER JOIN 
            STUDENT ON ROOM.ROOM_ID = STUDENT.ROOM_ID 
        INNER JOIN 
            AVAILABLE_ROOM ON ROOM.ROOM_ID = AVAILABLE_ROOM.ROOM_ID 
        WHERE 
            STUDENT.GENDER = (SELECT GENDER FROM STUDENT WHERE EMAIL = ?) AND 
             
            AVAILABLE_ROOM.ROOM_STATUS = 'Y'`;

    let filterParams = [email,email];

    if (req.body.building_name) {
        filterQuery += ' AND ROOM.BUILDING_NAME = ?';
        filterParams.push(req.body.building_name);
    }

    if (req.body.floor) {
        filterQuery += ' AND ROOM.FLOOR_NO = ?';
        filterParams.push(req.body.floor);
    }

    if (req.body.wing) {
        filterQuery += ' AND ROOM.WING = ?';
        filterParams.push(req.body.wing);
    }

    connection.query(filterQuery, filterParams, (err, filteredRoomResult) => {
        if (err) {
            console.error('Error fetching filtered room data:', err);
            res.status(500).send('Error fetching filtered room data');
            return;
        }

        res.status(200).json(filteredRoomResult);
    });
});

router.post('/', (req, res) => {
    console.log(req.body);
    const user = req.session.user;
    const email = user['email'];

    let filterQuery = `
        SELECT  
            STUDENT.STUDENT_ID, 
            STUDENT.NAME, 
            STUDENT.EMAIL, 
            STUDENT.CONTACT_NUMBER, 
            STUDENT.GENDER, 
            ROOM.BUILDING_NAME, 
            ROOM.FLOOR_NO, 
            ROOM.WING, 
            ROOM.ROOM_NUMBER
        FROM 
            ROOM 
        INNER JOIN 
            STUDENT ON ROOM.ROOM_ID = STUDENT.ROOM_ID 
        INNER JOIN 
            AVAILABLE_ROOM ON ROOM.ROOM_ID = AVAILABLE_ROOM.ROOM_ID 
        WHERE 
            STUDENT.GENDER = (SELECT GENDER FROM STUDENT WHERE EMAIL = ?) AND 
             
            AVAILABLE_ROOM.ROOM_STATUS = 'Y'`;

    let filterParams = [email];

    if (req.body.building_name) {
        filterQuery += ' AND ROOM.BUILDING_NAME = ?';
        filterParams.push(req.body.building_name);
    }

    if (req.body.floor) {
        filterQuery += ' AND ROOM.FLOOR_NO = ?';
        filterParams.push(req.body.floor);
    }

    if (req.body.wing) {
        filterQuery += ' AND ROOM.WING = ?';
        filterParams.push(req.body.wing);
    }
    console.log(filterQuery);
    console.log(filterParams);
    connection.query(filterQuery, filterParams, (err, filteredRoomResult) => {
        if (err) {
            console.error('Error fetching filtered room data:', err);
            res.status(500).send('Error fetching filtered room data');
            return;
        }

        res.status(200).json(filteredRoomResult);
    });
});

module.exports = router;