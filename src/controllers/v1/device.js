import DeviceModel from "../../models/device.js";

export default class DeviceController {
    _deviceModel = new DeviceModel()

    async getDevices(req, res) {
        const { userId, type } = req.params
        const { verbose } = req.query

        let devices
        if (userId) {
            devices = await this._deviceModel.get({ userId });
        }
        res.send(devices)
    }
}