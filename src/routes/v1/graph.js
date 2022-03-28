import express from "express";
import GraphController from "../../controllers/v1/graph.js";

export default class GraphRouter {
    _controller = new GraphController()
    _router = express.Router()
    constructor() {
        this.initializeRouter()
    }

    get router() { return this._router }

    initializeRouter() {
        this._router.get('/:deviceId', 
            /* (req, res) => this._authMiddleware.verifyToken(req, res), */
            (req, res) => this._controller.getGraphData(req, res)
        )
    }
}