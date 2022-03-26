import express from "express";
import AuthRouter from "./auth.js";
import DataRouter from "./data.js";
import DeviceRouter from "./device.js";
import LabelRouter from "./label.js";
import RequestRouter from "./request.js";
import UserRouter from "./user.js";

export default class IndexRouterV1 {
    _authRouter = new AuthRouter()
    _dataRouter = new DataRouter()
    _deviceRouter = new DeviceRouter()
    _labelRouter = new LabelRouter()
    _requestRouter = new RequestRouter()
    _userRouter = new UserRouter()
    _router = express.Router()

    constructor() {
        this.initializeRouter()
    }

    get router() { return this._router }

    initializeRouter() {
        this._router.use('/auth', this._authRouter.router)
        this._router.use('/data', this._dataRouter.router)
        this._router.use('/device', this._deviceRouter.router)
        this._router.use('/label', this._labelRouter.router)
        this._router.use('/request', this._requestRouter.router)
        this._router.use('/user', this._userRouter.router)
    }
}