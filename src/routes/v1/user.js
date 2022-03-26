import express from "express"
import UserController from "../../controllers/v1/user.js"
import AuthMiddleware from "../../middlewares/authMiddleware.js"

export default class UserRouter {
    _router = express.Router()
    _controller = new UserController()
    _authMiddleware = new AuthMiddleware()

    constructor() {
        this.initializeRouter()
    }

    get router() { return this._router }

    initializeRouter() {
        this._router.get('/alert-type',
            (req, res) => this._authMiddleware.verifyToken(req, res),
            (req, res) => this._controller.setAlertType(req, res)
        )
    }
}