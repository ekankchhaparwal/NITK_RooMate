const connection = require('./database.js');


const deleteUser = (req,res) => {
    let { slno } = req.params;
    query = `delete from graduate where slno = ${slno};`;
    connection.query(query, (err, results) => {
        if (err) {
            return results;
        } else {
            return res.status(200).json({ status: 'Account deleted successfully' });
        }
    });
};

module.exports = deleteUser;