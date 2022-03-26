export default class DataController {
    async getData(req, res) {
        res.status(200).json({ message: 'From data' })
    }

    async addData(req, res) {
        res.status(200).json({ message: 'From data' })
    }
}