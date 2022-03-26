export default class DeviceController {
    async getDevices(req, res) {
        res.status(200).json({ message: 'From devices' })
    }
}