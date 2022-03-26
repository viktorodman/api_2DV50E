import express from "express"
import LabelController from "../../controllers/v1/label.js"

export default class LabelRouter {
    _router = express.Router()
    _controller = new LabelController()

    constructor() {
        this.initializeRouter()
    }

    get router() { return this._router }

    initializeRouter() {
        this._router.get('/',
            (req, res) => this._controller.getLabels(req, res)
        )
        this._router.get('/organization/:organization',
            (req, res) => this._controller.getLabels(req, res)
        )
        this._router.get('/:labelId', 
            (req, res) => this._controller.getLabels(req, res)
        )
    }
}