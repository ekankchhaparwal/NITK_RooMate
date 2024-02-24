const connection = require('./database.js');

router.post('/signUp', (req, res) => {
    
    const studentName = req.body.studentName;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword =  req.body.confrimPassword;
    const contact = req.body.contact;
    const gender = req.body.gender;

    const emailQuery = `SELECT * FROM student WHERE email = ${email}`;

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

    
    const insertQuery = `insert into student values('${studentName}', '${email}', '${password}', '${contact},'${gender}');`;

    
    connection.query(insertQuery, (err, results) => {
        if (err) {
            return results;
        } else {
            return res.status(200).json({ status: 'Account created' });
        }
    });
});