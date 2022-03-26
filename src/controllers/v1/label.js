export default class LabelController {
    async getLabels(req, res) {
        res.status(200).json({ message: 'From label' })
    }
}