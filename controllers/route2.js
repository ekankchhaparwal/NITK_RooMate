
const connection = require('./database.js');

const getUser = (req, res) => {
    const query = "select * from graduate;";
    connection.query(query , (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.send('Error fetching data from database');
            return;
        }
        res.send(results);
    });
};

module.exports = getUser;