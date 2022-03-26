import express from "express";
import DeviceController from "../../controllers/v1/device.js";
import AuthMiddleware from "../../middlewares/authMiddleware.js";

export default class DeviceRouter {
    _router = express.Router()
    _controller = new DeviceController()
    _authMiddleware = new AuthMiddleware()

    constructor() {
        this.initializeRouter()
    }

    get router() { return this._router }

    initializeRouter() {
        this._router.get('/user/:userId', 
            (req, res) => this._authMiddleware.verifyToken(req, res),
            (req, res) => this._controller.getDevices(req, res)
        )
    }
}