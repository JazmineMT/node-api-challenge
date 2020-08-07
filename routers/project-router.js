const express = require('express')
const router = express.Router();

const Helper = require('../data/helpers/projectModel');
const { json, request, response } = require('express');


// this one won't get all of the projects in the database

router.get('/', (req, res) => {
    Helper.get(req.query)
    .then( project => {
        res.status(200).json(project)
    })
    .catch( err => {
        console.log(err)
        res.status(500).json({
            message: 'We had trouble getting your data'
        })
    })
})


router.get('/:id',ValidateProjectId,  (req, res) => {
    console.log(res.body)
    Helper.get(req.params.id)
    .then( project => {
        res.status(200).json(project)
    })
    .catch( err => {
        console.log(err)
        res.status(500).json({
            message: 'We had trouble getting your data'
        })
    })
})

router.get('/:id/actions', ValidateProjectId, (req, res) => {
    Helper.getProjectActions(req.params.id)
    .then( project => {
        res.status(200).json(project)
    })
    .catch( err => {
        console.log(err)
        res.status(500).json({
            message: 'We had trouble getting your data'
        })
    })
})


router.post('/', (req, res)=> {
    const newPost = req.body
    Helper.insert(newPost)
    .then( post => {
        res.status(201).json(post)
    })
    .catch( err => {
        console.log(err)
        res.status(500).json({
            message: 'We had trouble posting your data'
        })
    })
})

router.put('/:id', ValidateProjectId,  (req, res) => {
    const newUpdate = req.body
    Helper.update( req.params.id , newUpdate)
    .then( up => {
        res.status(200).json(up)
    })
    .catch( err => {
        console.log(err)
        res.status(500).json({
            message: 'We had trouble getting your data'
        })
    })
})

router.delete('/:id', ValidateProjectId, (req , res)=> {
    Helper.remove(req.params.id)
    .then( old => {
        res.status(200).json(old)
    })
    .catch( err => {
        console.log(err)
        res.status(500).json({
            message: 'We had trouble removing your data'
        })
    })
})


function ValidateProjectId(req, res, next){
    Helper.get(req.params.id)
    .then(id => {
        if( id === null ){
            res.status(400).json({
                message: 'The ID you have entered is not found within our system'
            })
        } else {
            next();
        }

    })
   
}


module.exports = router;