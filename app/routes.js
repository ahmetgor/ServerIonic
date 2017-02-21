var AuthenticationController = require('./controllers/authentication'),
    TodoController = require('./controllers/kayitlar'),
    UsersController = require('./controllers/users'),
    express = require('express'),
    passportService = require('../config/passport'),
    passport = require('passport');

var requireAuth = passport.authenticate('jwt', {session: false}),
    requireLogin = passport.authenticate('local', {session: false});

module.exports = function(app){

    var apiRoutes = express.Router(),
        authRoutes = express.Router(),
        todoRoutes = express.Router();
        userRoutes = express.Router();

    // Auth Routes
    apiRoutes.use('/auth', authRoutes);

    authRoutes.post('/register', AuthenticationController.register);
    authRoutes.post('/login', requireLogin, AuthenticationController.login);
    // authRoutes.get('/users', requireAuth, AuthenticationController.users);
    authRoutes.get('/protected', requireAuth, function(req, res){
        res.send({ content: 'Success'});
    });


    apiRoutes.use('/users', userRoutes);

    userRoutes.get('/', requireAuth, UsersController.getUsers);
    userRoutes.get('/:email', requireAuth, UsersController.getUser);
    userRoutes.delete('/:user_id', requireAuth, UsersController.deleteUser);
    userRoutes.put('/:user_id', requireAuth, UsersController.updateUser);


    // Todo Routes
    apiRoutes.use('/kayitlar', todoRoutes);

    todoRoutes.get('/', requireAuth, TodoController.getKayitlar);
    todoRoutes.get('/:kayit_id', requireAuth, TodoController.getKayit);
    todoRoutes.post('/', requireAuth,/* AuthenticationController.roleAuthorization(['creator','editor']),*/ TodoController.createKayit);
    todoRoutes.delete('/:kayit_id', requireAuth, /* AuthenticationController.roleAuthorization(['editor']),*/ TodoController.deleteKayit);
    todoRoutes.put('/:kayit_id', requireAuth, /* AuthenticationController.roleAuthorization(['editor']),*/ TodoController.updateKayit);

    // Set up routes
    app.use('/api', apiRoutes);

}
