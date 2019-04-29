module.exports = (app) => {
    const learn = require('../controllers/learn.controller');

    app.post('/learns', learn.create);

    app.get('/learns', learn.findAll);

    app.patch('/learnsUpdate', learn.update);

    app.post('/learnsDelete', learn.delete);

}