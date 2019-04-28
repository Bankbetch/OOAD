module.exports = (app) => {
    const login = require('../controllers/login.controller');

    app.get('/login/:id', login.findOne);
}