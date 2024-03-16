const express = require('express')
const router = express.Router();
const connection = require('../database');

router.post('/sendRequestToStudent', (req, res) => {
    const REQ_STUDENT_EMAIL = req.session.user['email'];
    const REQ_TO_STUDENT  = req.body;
    console.log(REQ_TO_STUDENT);
    connection.query(
      'SELECT * FROM STUDENT WHERE EMAIL = ?',
      [REQ_STUDENT_EMAIL],
      (error, requestingStudentRows) => {
        if (error) {
          console.error('Error fetching requesting student:', error);
          return res.status(500).json({ error: 'Internal server error' });
        }
  
        if (requestingStudentRows.length === 0) {
          return res.status(404).json({ error: 'Requesting student not found' });
        }
  
        const requestingStudent = requestingStudentRows[0];
  
        connection.query(
          'INSERT INTO SWAP_REQUEST (REQ_STUDENT_ID, REQ_TO_STUDENT_ID, REQ_ROOM_ID, REQ_TO_ROOM_ID, CONFIRM_AVAILABILITY) VALUES (?, ?, ?, ?, ?)',
          [requestingStudent.STUDENT_ID, REQ_TO_STUDENT['STUDENT_ID'], requestingStudent.ROOM_ID, REQ_TO_STUDENT['ROOM_ID'], 'Pending'],
          (error) => {
            if (error) {
              console.error('Error inserting swap request:', error);
              return res.status(500).json({ error: 'Internal server error' });
            }
  
            res.status(200).json({ message: 'Room swap request sent successfully.' });
          }
        );
      }
    );
  });
  
  
  

module.exports = router;