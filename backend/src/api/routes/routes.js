    const { users } = require('../../database/db.config');

    module.exports = app => {
        const router = require('express').Router();
        // Company routes
        const CompanyController = require('../controllers/Company.controller');
        router.post('/companies',CompanyController.create)
        router.get('/companies',CompanyController.findAll);
        router.get('/companies/:id',CompanyController.findOne);
        router.put('/companies/:id',CompanyController.update);
        router.delete('/companies/:id',CompanyController.delete);
        //User routes
        const UserController = require('../controllers/User.controller');
        router.post('/users',UserController.create)
        router.get('/users',UserController.findAll);
        router.get('/users/:id',UserController.findOne);
        router.put('/users/:id',UserController.update);
        router.delete('/users/:id',UserController.delete);
        router.post('/users/login',UserController.login);
        router.get('/users/managers/:id',UserController.findManagers);
        router.get('/users/admins/:id',UserController.findAdmins);

        //Tiket routes
        const TicketController = require('../controllers/Ticket.controller');
        router.post('/tickets',TicketController.create)
        router.get('/tickets',TicketController.findAll);
        router.get('/tickets/:id',TicketController.findOne);
        router.put('/tickets/:id',TicketController.update);
        router.delete('/tickets/:id',TicketController.delete);
        router.get(`/ticketsClient/:idU/:idC`,TicketController.findByUserCompany);
        router.get(`/ticketsManager/:idC`,TicketController.findByCompany);
        //Comment routes
        const CommentController = require('../controllers/Comment.controller');
        router.post('/comments',CommentController.create)
        router.get('/comments',CommentController.findAll);
        router.get('/comments/:id',CommentController.findOne);
        router.put('/comments/:id',CommentController.update);
        router.delete('/comments/:id',CommentController.delete);
        router.get('/commentsTicket/:id',CommentController.findByTicket);

        app.use('/api/',router);
    }