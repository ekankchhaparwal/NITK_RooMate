const express=require('express')
const router=express.Router();
const connection=require('../database');

router.get('/',(req,res)=>{
    const email=req.session.user['email'];
    const query=`SELECT * FROM SWAP_REQUEST WHERE REQ_TO_STUDENT_ID = (SELECT STUDENT_ID FROM STUDENT WHERE EMAIL = ?) AND CONFIRM_AVAILABILITY = 'PENDING'`;
    connection.query(query,[email],(err,results)=>{
        if(err){
            console.error('Error fetching swap requests:',err);
            res.status(500).send('Error fetching swap requests');
            return;
        }
        res.status(200).json(results);
    });
}
);

module.exports=router;