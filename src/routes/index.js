import express from "express";
import BasicController from "../controllers/basic.js";

export default class IndexRouter {
    _controller = new BasicController()
    _router = express.Router()

    constructor() {
        this.initializeRouter()
    }

    get router() { return this._router }

    initializeRouter() {
        this._router.get('/',(req, res) => this._controller.home(req, res));
        this._router.get('/second', (req, res) => this._controller.second(req, res))
    }
}