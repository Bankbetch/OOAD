module.exports = (app) => {
    const subject = require('../controllers/subject.controller');

    app.post('/subject', subject.create);

    app.get('/subject', subject.findAll);

    app.get('/subject/:id', subject.findOne);

    app.patch('/subjectUpdate', subject.update);

    app.post('/subjectDelete', subject.delete);
}