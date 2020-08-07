const express = require('express')
const router = express.Router();

const Helper = require('../data/helpers/actionModel')



router.get('/:id', (req, res) => {
    Helper.get(req.params.id)
    .then( act => {
        res.status(200).json(act)
    })
    .catch( err => {
        console.log(err)
        res.status(500).json({
            message: 'We had trouble getting your data'
        })
    })
})






module.exports = router;