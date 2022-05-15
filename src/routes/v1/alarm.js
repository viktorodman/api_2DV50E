import express from "express"
import AlarmController from "../../controllers/v1/alarm.js"
import AuthMiddleware from "../../middlewares/authMiddleware.js"

export default class AlarmRouter {
    _router = express.Router()
    _controller = new AlarmController()
    _authMiddleware = new AuthMiddleware()
    constructor() {
        this.initializeRouter()
    }

    get router() { return this._router }

    initializeRouter() {
        this._router.get('/',
            (req, res) => this._controller.getAlarms(req, res)
        )

        this._router.post('/',
            (req, res) => this._controller.createAlarm(req, res)
        )

    }
}