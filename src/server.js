import express from "express";
import IndexRouter from "./routes/index.js";
import IndexRouterV1 from "./routes/v1/index.js";
import cors from 'cors'
export default class Server {
    _app = express()
    _baseRouter = express.Router()
    _indexRouterV1 = new IndexRouterV1()
    _indexRouter = new IndexRouter();
    _port = process.env.HTTP_PORT || 4000

    constructor() {}

    run() {
        this._setUpRoutes()
        this._setUpMiddlewares()
        this._setUpViewEngine()
        this._listen()
    }

    _setUpRoutes() {
        this._app.use(this._indexRouterV1.router)
        this._app.use(this._indexRouter.router)
    }

    _setUpMiddlewares() {
        this._app.use(express.json()) // body parser
        this._app.use(express.urlencoded({ extended: true })) // URL encoder
        this._app.use(cors({ origin: '*' })) // Cors
    }

    _setUpViewEngine() {
        this._app.set('view engine', 'pug');
        this._app.set('views', './src/views')
    }

    _listen() { 
        this._app.listen(
            this._port, () => console.log(`App listening on http://localhost:${this._port}`)
        )
    }
}