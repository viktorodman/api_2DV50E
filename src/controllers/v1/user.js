export default class UserController {
    async setAlertType(req, res) {
        res.status(200).json({ message: 'From user' })
    }

    async addPassword(req, res) {
        res.send({ok:"ok"})
    }
}