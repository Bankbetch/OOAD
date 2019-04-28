module.exports = (app) => {
    const users = require('../controllers/user.controller');

    app.post('/user', users.create);

    app.get('/user', users.findAll);

    app.patch('/userUpdate', users.update);

    app.post('/userDelete', users.delete);
}