var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
    mongoose = require('mongoose')
Todo = mongoose.model('Todo'),
    asyncHandler = require('express-async-handler');


module.exports = function (app, config) {
    app.use('/api', router);

    router.get('/todos', asyncHandler(async (req, res) => {
        logger.log('info', 'Get all todos');
        let query = User.find();
        query.sort(req.query.order)
        await query.exec().then(result => {
            res.status(200).json(result);
        })
    }));


    router.get('/todos/:id', asyncHandler(async (req, res) => {
        logger.log('info', 'Get todo %s', req.params.id);
        await User.findById(req.params.id).then(result => {
            res.status(200).json(result);
        })
    }));


    router.post('/todos', asyncHandler(async (req, res) => {
        logger.log('info', 'Creating todo');
        var user = new User(req.body);
        await user.save()
            .then(result => {
                res.status(201).json(result);
            })

    }));

    router.put('/todos', asyncHandler(async (req, res) => {
        logger.log('info', 'Updating todo');
        await User.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true })
            .then(result => {
                res.status(200).json(result);
            })
    }));

    router.delete('/todos/:id', asyncHandler(async (req, res) => {
        logger.log('info', 'Deleting todo %s', req.params.id);
        await User.remove({ _id: req.params.id })
            .then(result => {
                res.status(200).json(result);
            })
    }));


};
