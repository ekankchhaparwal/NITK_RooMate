const express=require('express')
const router=express.Router();
const connection=require('../database');

router.post('/',(req,res)=>{
    const swapRequestId=req.body.swapRequestId;
    const query=`UPDATE SWAP_REQUEST SET CONFIRM_AVAILABILITY = 'REJECTED' WHERE REQUEST_ID = ?`;
    connection.query(query,[swapRequestId],(err,results)=>{
        if(err){
            console.error('Error rejecting swap request:',err);
            res.status(500).send('Error rejecting swap request');
            return;
        }
        res.status(200).send('Swap request rejected');
    });
}
);

module.exports=router;