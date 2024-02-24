const connection = require('./database.js');


const updateUser = (req,res)=>{
    const { slno } = req.params;
    const name = req.body.name;
    console.log(name)
    console.log(slno)
    
    query = `update graduate set name = ${name} where slno = ${slno};`;
    console.log(query)
    connection.query(query, (err, results) => {
        if (err) {
            return results;
        } else {
            return res.status(200).json({ status: 'Account updated successfully' });
        }
    });
};

module.exports = updateUser;