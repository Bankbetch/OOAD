module.exports = (app) => {
    const build = require('../controllers/build.controller');

    app.post('/build', build.create);

    app.get('/build', build.findAll);

    app.patch('/buildUpdate', build.update);

    app.post('/buildDelete', build.delete);
}