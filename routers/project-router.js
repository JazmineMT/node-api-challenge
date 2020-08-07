const express = require('express')
const router = express.Router();

const Helper = require('../data/helpers/projectModel')


router.get('/:id', (req, res) => {
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

router.get('/:id/actions', (req, res) => {
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

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req , res)=> {
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


module.exports = router;