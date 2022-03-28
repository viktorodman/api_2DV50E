import LabelModel from "../../models/label.js";

export default class LabelController {
    _labelModel = new LabelModel()
    async getLabels(req, res) {
        const { organization, labelId } = req.params
        let labels = await this._labelModel.get({ organization, labelId });

        res.send({ data: labels })
    }
}