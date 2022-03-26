export default class RequestController {
    async getRequests(req, res) {
        res.status(200).json({ message: 'From requests' })
    }
}