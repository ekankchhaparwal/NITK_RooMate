const express = require('express')
const router = express.Router();
const connection = require('./database');


router.post('/signUp', (req, res) => {
    
    const studentName = req.body.studentName;
    const studentID = req.body.studentID;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword =  req.body.confirmPassword;
    const contact = req.body.contact;
    const gender = req.body.gender;
    const room= req.body.room;
    const wing= req.body.wing;
    const floor= req.body.floor;
    const buildingName= req.body.buildingName;

    
    const emailQuery = `SELECT * FROM student WHERE email = "${email}"`;

    connection.query(emailQuery, (err, results) => {
       
        if (err) {
            console.error('Error fetching data:', err);
            return results;
        }

        if (password !== confirmPassword) {
            return res.status(401).json({ status: 'Passwords do not match' });
        } 
        
        if (results.length !== 0) {
            return res.status(401).json({ status: 'Account already exists' });
        } 

    });

    insertQueryLogin= `INSERT INTO authorization (email, passcode) VALUES (?, ?)`;
    insertParamsLogin= [email, password];
    connection.query(insertQueryLogin, insertParamsLogin, (err, results) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).send('Error inserting data');
            return;
        }
    });

    selectQueryRoomID= `SELECT room_id FROM room WHERE building_name = ? AND floor_no = ? AND wing = ? AND room_number = ?`;
    selectParamsRoomID= [buildingName, floor, wing, room];
    connection.query(selectQueryRoomID, selectParamsRoomID, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).send('Error fetching data');
            return;
        }
        if (results.length === 0) {
            insertQueryRoom= `INSERT INTO room (building_name, floor_no, wing, room_number) VALUES (?, ?, ?, ?)`;
            insertParamsRoom= [buildingName, floor, wing, room];
            connection.query(insertQueryRoom, insertParamsRoom, (err, results) => {
                if (err) {
                    console.error('Error inserting data:', err);
                    res.status(500).send('Error inserting data');
                    return;
                }
            });

            selectQueryRoomID= `SELECT room_id FROM room WHERE building_name = ? AND floor_no = ? AND wing = ? AND room_number = ?`;
            selectParamsRoomID= [buildingName, floor, wing, room];
            connection.query(selectQueryRoomID, selectParamsRoomID, (err, results) => {
                if (err) {
                    console.error('Error fetching data:', err);
                    res.status(500).send('Error fetching data');
                    return;
                }
                const roomID= results[0].room_id;
            insertQueryStudent= `INSERT INTO student (name, email, contact_number, room_id, gender, student_id) VALUES (?, ?, ?, ?, ?, ?)`;
            insertParamsStudent= [studentName, email, contact, roomID, gender, studentID];
            connection.query(insertQueryStudent, insertParamsStudent, (err, results) => {
                if (err) {
                    console.error('Error inserting data:', err);
                    res.status(500).send('Error inserting data');
                    return;
                }
                else {
                    res.status(200).json({ status: 'Account created' });
                }
            });
            });

            

        }

        else {
            const roomID= results[0].room_id;
            insertQueryStudent= `INSERT INTO student (name, email, contact_number, room_id, gender, student_id) VALUES (?, ?, ?, ?, ?, ?)`;
            insertParamsStudent= [studentName, email, contact, roomID, gender, studentID];
            connection.query(insertQueryStudent, insertParamsStudent, (err, results) => {
                if (err) {
                    console.error('Error inserting data:', err);
                    res.status(500).send('Error inserting data');
                    return;
                }
                else {
                    res.status(200).json({ status: 'Account created' });
                }
            });
        }
});
});


module.exports = router;