import DeviceModel from "../../models/device.js";

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

        console.log("nuså",userId)

        res.send(devices)
    }

    async changeLatLng(req, res) {
        const { deviceId } = req.params
        const { lat, lng } = req.body

        if (!lat || !lng) {
            res.status(400).json()
        }

        

        await this._deviceModel.updateLatLng({lat, lng, deviceId})

        res.status(200).json()
    }
}