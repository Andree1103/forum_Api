
const {logError, ormErrorHandler, errorHandler} = require('../middlewares/error.handler');

const errorHandlerRouter = (app) => {
    app.use(logError);
    app.use(ormErrorHandler);
    app.use(errorHandler);

    app.use('*',(req,res) => {
        return res.status(404).send('Pagina no encontrada')
    })
}

module.exports = errorHandlerRouter;