module.exports = (app) => {
    const user = require('../controllers/excel.controller');

    app.post('/userExcel', user.excel)

    app.post('/userInsertExcel', user.createExcel)
}