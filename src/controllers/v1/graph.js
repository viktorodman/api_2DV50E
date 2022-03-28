import DeviceModel from "../../models/device.js";
import RequestModel from "../../models/request.js";

export default class GraphController {
    _deviceModel = new DeviceModel()
    _requestModel = new RequestModel()

    async getGraphData(req, res) {
        const { deviceId } = req.params
        const device = (await this._deviceModel.get({deviceId}))

        if (device.length < 1) return res.status(200).json([])    

        const data = await this.createGraphData(device[0])

        res.status(200).json(data)
    }

    async createGraphData(device) {
        console.log(device)
        switch(device.name) {
            case 'MeteoHelix-01':
                return await this.getMetoHelixGraphData(device.id, device.name)
            default:
                return []
        }
    }

    async getMetoHelixGraphData(deviceId, deviceName) {
        const requestData = await this._requestModel.get({ deviceId })
        const graphData = {
            deviceName,
             values: []
        }

        for (const sensorData of requestData) {
            if (sensorData.decoded_payload && 
                sensorData.decoded_payload.humidity &&
                sensorData.decoded_payload.temperature &&
                sensorData.decoded_payload.pressure) {
                graphData.values.push({
                    created: sensorData.created,
                    humidity: sensorData.decoded_payload.humidity,
                    temperature: sensorData.decoded_payload.temperature,
                    pressure: sensorData.decoded_payload.pressure,
                })
            }
        }

        return graphData
    }
}