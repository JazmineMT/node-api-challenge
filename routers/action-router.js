const express = require('express')
const router = express.Router();

const Helper = require('../data/helpers/actionModel');
const { route } = require('./project-router');



router.get('/:id', ValidatePostId, (req, res) => {
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



router.post('/', (req, res)=>{
    const newAction = req.body
    Helper.insert(newAction)
    .then( act => {
        res.status(200).json(act)
    })
    .catch( err => {
        console.log(err)
        res.status(500).json({
            message: ' We had trouble adding your data'
        })
    })
})

router.put('/:id' ,ValidatePostId, (req, res)=>{
    const changes = req.body
    Helper.update(req.params.id , changes)
    .then( up => {
        res.status(201).json(up)
    })
    .catch( err => {
        console.log(err)
        res.status(500).json({
            message: ' We had trouble updatign your data'
        })
    })
})

router.delete('/:id', ValidatePostId, (req, res)=>{
    Helper.remove(req.params.id)
    .then( del => {
        res.status(200).json(del)
    })
    .catch( err => {
        console.log(err)
        res.status(500).json({
            message: " we had trouble removing your data"
        })
    })
})


function ValidatePostId(req, res, next){
    if(res.headers.content-length ===  4 ){
        res.status(400).json({
            message: 'The ID you have entered is not found within our system'
        })
    } else {
        next();
    }
}




module.exports = router;