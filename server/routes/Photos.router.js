const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const rejectUnauthenticated = require('../modules/authentication-middleware')

/**
 * GET route template
 */
router.get('/',(req, res) => {
    queryText = `SELECT * FROM "Photos";`;
    pool.query(queryText).then((result)=>{
        // console.log(result.rows);
        res.send(result.rows);
    }).catch((error)=>{
        console.log(error);
    })
});

// router.delete('/:id', rejectUnauthenticated, (req, res) => { 
//     const location = req.body; 
//     console.log('in delete', location) 
//         const query = `DELETE FROM "locations" WHERE "id"=$1;`;
//         pool.query(query, [req.params.id]).then(() => {
//             res.sendStatus(200);
//         }).catch((error) => {
//             console.log('ERROR with DELETE ', error);

//             res.sendStatus(500);
//         })
// });

/**
 * POST route template
 */
router.post('/',(req, res) => {
    const photo = req.body;
    console.log(photo);
    
    const values =[
                    req.user.id,
                    photo.id,
                    photo.photo.image
                ]
    queryText = `INSERT INTO "Photos"(user_id, location_id, photo_img_string)
                 VALUES($1,$2,$3)`;
    pool.query(queryText,values)
        .then((result) => {
            res.sendStatus( 201 );
        }).catch((error) =>{
            console.log(error);
            res.sendStatus(500)
        });
});

module.exports = router;