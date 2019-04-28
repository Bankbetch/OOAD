module.exports = (app) => {
    const room = require('../controllers/room.controller');

    app.post('/room', room.create);

    app.get('/room', room.findAll);

    app.patch('/roomUpdate', room.update);

    app.post('/roomDelete', room.delete);
}