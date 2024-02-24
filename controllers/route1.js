
const connection = require('./database.js');

const createUser = (req,res) =>{
    console.log('post route reached');
    const slno = req.body.slno;
    const name = req.body.name;
    const stipend = req.body.stipend;
    const subject = req.body.subject;
    const average = req.body.average;
    const ranks = req.body.ranks;
    const query = `insert into graduate values(${slno},${name},${stipend},${subject},${average},${ranks});`;
    console.log(query);
    connection.query(query, (err, results) => {
        if (err) {
            return results;
        } else {
            return res.status(200).json({ status: 'Account created successfully' });
        }
    });
};

    
module.exports = createUser;





