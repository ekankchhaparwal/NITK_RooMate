const connection = require('./database.js');

router.post('/login', (req, res) => {
   
    const email = req.body.email;
    const givenPassword = req.body.password;

    const checkQuery = `SELECT password FROM student WHERE email = ${email};`;
    

    connection.query(checkQuery, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            return results;
        }
        
        
        if (results.length === 0) {
            return res.status(401).json({ status: 'email is invalid' });
        }
        
        
        

        if (givenPassword !== results.password) {
            return res.status(401).json({ status: 'Incorrect paasword' });
        }
        
        res.status(200).json({ status: 'Login successfull' });
    });
});