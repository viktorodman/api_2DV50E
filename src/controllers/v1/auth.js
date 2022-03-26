export default class AuthController {
    async setToken(req, res) {
        res.status(200).json({message: 'From auth'})
    }
}