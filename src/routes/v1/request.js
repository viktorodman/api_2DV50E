import express from "express"
import RequestController from "../../controllers/v1/request.js"
import AuthMiddleware from "../../middlewares/authMiddleware.js"

export default class RequestRouter {
    _router = express.Router()
    _controller = new RequestController()
    _authMiddleware = new AuthMiddleware()
    constructor() {
        this.initializeRouter()
    }

    get router() { return this._router }

    initializeRouter() {
        this._router.get('/user/:userId/:type?',
            (req, res) => this._authMiddleware.verifyToken(req, res),
            (req, res) => this._controller.getRequests(req, res)
        )
        this._router.get('/device/:deviceId/:type?',
            (req, res) => this._authMiddleware.verifyToken(req, res),
            (req, res) => this._controller.getRequests(req, res)
        )
    }
}