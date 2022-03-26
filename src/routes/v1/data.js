import express from "express"
import DataController from "../../controllers/v1/data.js"

export default class DataRouter {
    _router = express.Router()
    _controller = new DataController()
    constructor() {
        this.initializeRouter()
    }

    get router() { return this._router }

    initializeRouter() {
        this._router.get('/', (req, res) => this._controller.getData(req, res))
        this._router.post('/', (req, res) => this._controller.addData(req, res))
    }
}