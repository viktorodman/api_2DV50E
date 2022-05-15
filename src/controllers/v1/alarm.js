export default class AlarmController {
    async getAlarms(req, res) {
        res.status(200).json({message: 'From get alarms'})
    }

    async createAlarm(req, res) {
        res.status(200).json({message: 'From create alarms'})
    }
}