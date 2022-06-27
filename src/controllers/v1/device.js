import DeviceModel from "../../models/device.js";
import { translateDeviceData } from "../../utils/fiwareConfig.js";

export default class DeviceController {
    _deviceModel = new DeviceModel()

    async getDevices(req, res) {
        const { userId, type } = req.params
        const { verbose } = req.query

        let devices
        if (userId) {
            devices = await this._deviceModel.get({ userId });
            
            console.log(devices)
        }

        translateDeviceData(devices)

        console.log("nuså",userId)

        res.send(devices)
    }

    async updateInfo(req, res) {
        const { deviceId } = req.params
        const { lat, lng, desc } = req.body

        if (!lat || !lng || !desc) {
            res.status(400).json()
        }

        console.log("first", desc, lat, lng)

        await this._deviceModel.updateInfo({lat, lng, desc, deviceId})

        res.status(200).json()
    }
}