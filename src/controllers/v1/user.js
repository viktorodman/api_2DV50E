export default class UserController {
    async setAlertType(req, res) {
        res.status(200).json({ message: 'From user' })
    }
}