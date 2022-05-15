export default class AuthController {
    async setToken(req, res) {
        res.status(200).json({message: 'From auth'})
    }

    async isAuthenticated(req, res) {
        console.log("försöker logga in")
        res.status(200).json()
    }

    async login(req, res) {
        console.log("loggar in")
        res.status(200).json()
    }
}