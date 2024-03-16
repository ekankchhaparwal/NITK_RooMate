const express=require('express')
const router=express.Router();
const connection=require('../database');

router.post('/',(req,res)=>{
    const swapRequestId=req.body.swapRequestId;
    
    connection.beginTransaction((err)=>{
        if(err){
            console.error('Error beginning transaction:',err);
            res.status(500).send('Error rejecting swap request');
            return;
        }
        const query1=`UPDATE SWAP_REQUEST SET CONFIRM_AVAILABILITY = 'ACCEPTED' WHERE REQUEST_ID = ?`;
        connection.query(query1,[swapRequestId],(err,results)=>{
            if(err){
                return connection.rollback(()=>{
                    console.error('Error accepting swap request:',err);
                    res.status(500).send('Error accepting swap request');
                }
                );
            }
        }
        );
        const query2=`SELECT REQ_STUDENT_ID, REQ_TO_STUDENT_ID, REQ_ROOM_ID, REQ_TO_ROOM_ID FROM SWAP_REQUEST WHERE REQUEST_ID = ?`;
        connection.query(query2,[swapRequestId],(err,results)=>{
            if(err){
                return connection.rollback(()=>{
                    console.error('Error fetching swap request:',err);
                    res.status(500).send('Error accepting swap request');
                }
                );
            }
            const reqStudentId=results[0].REQ_STUDENT_ID;
            const reqToStudentId=results[0].REQ_TO_STUDENT_ID;
            const reqRoomId=results[0].REQ_ROOM_ID;
            const reqToRoomId=results[0].REQ_TO_ROOM_ID;
            const query3=`UPDATE STUDENT SET ROOM_ID = ? WHERE STUDENT_ID = ?`;
            connection.query(query3,[reqToRoomId,reqStudentId],(err,results)=>{
                if(err){
                    return connection.rollback(()=>{
                        console.error('Error updating student room:',err);
                        res.status(500).send('Error accepting swap request');
                    }
                    );
                }
            }
            );
            const query4=`UPDATE STUDENT SET ROOM_ID = ? WHERE STUDENT_ID = ?`;
            connection.query(query4,[reqRoomId,reqToStudentId],(err,results)=>{
                if(err){
                    return connection.rollback(()=>{
                        console.error('Error updating student room:',err);
                        res.status(500).send('Error accepting swap request');
                    }
                    );
                }
            }
            );
            const query5=`DELETE FROM AVAILABLE_ROOM WHERE ROOM_ID IN (?,?)`;
            connection.query(query5,[reqRoomId,reqToRoomId],(err,results)=>{
                if(err){
                    return connection.rollback(()=>{
                        console.error('Error deleting rooms:',err);
                        res.status(500).send('Error accepting swap request');
                    }
                    );
                }
            }
            );
        }
        );
        connection.commit((err)=>{
            if(err){
                return connection.rollback(()=>{
                    console.error('Error committing transaction:',err);
                    res.status(500).send('Error accepting swap request');
                }
                );
            }
            res.status(200).send('Swap request accepted');
        }
        );
    }
    );
}
);

module.exports=router;
            

                    
    