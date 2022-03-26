export default class UserDeviceModel {
    async upsert(deviceId, userId) {
        await mysqlQuery(
            `INSERT INTO user_device 
            (user_id, device_id)
            values(:userId, :deviceId);`, { userId, deviceId}
        )
    }

    async get({ deviceId, userId }) {
        let where = ``
        if (deviceId) where += ` AND device_id = :deviceId`
        if (userId) where += ` AND user_id = :userId`
        return await mysqlQuery(`
            SELECT * FROM user_device
            where true
            ${where};
            `, { deviceId, userId }
        )
    }
}