module.exports = (app) => {
    const exam = require('../controllers/exam.controller');

    app.post('/exam', exam.create)

    app.get('/exam', exam.findAll)

    app.patch('examUpdate', exam.update)

    app.patch('examUpdate/status', exam.updateStatus)

    app.post('examDelete', exam.delete)

}