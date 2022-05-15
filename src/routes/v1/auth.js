import express from "express"
import AuthController from "../../controllers/v1/auth.js"

export default class AuthRouter {
    _router = express.Router()
    _controller = new AuthController()

    constructor() {
        this.initializeRouter()
    }

    get router() { return this._router }

    initializeRouter() {
        this._router.post('/', (req, res) => this._controller.setToken(req, res))

        this._router.get('/', (req, res) => this._controller.isAuthenticated(req, res))

        this._router.post('/login', (req, res) => this._controller.login(req, res))
    }
}