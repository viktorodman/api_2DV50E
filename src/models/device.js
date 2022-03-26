export default class DeviceModel {
    async upsert(device) {
        const { metadata } = device;
        if (metadata?.labels?.length) {
            device.label = metadata.labels[0]?.id
            device.label_two = metadata.labels[1]?.id
        }
        await mysqlQuery(
            `INSERT INTO device
            (id, uuid, dev_eui, devaddr, name, downlink_url, label, label_two)
            values (:id, :uuid, :dev_eui, :devaddr, :name, :downlink_url, :label, :label_two)
            ON DUPLICATE KEY UPDATE
            updated = now(),
            dev_eui = :dev_eui,
            devaddr = :devaddr,
            name = :name,
            downlink_url = :downlink_url`,
            device
        )
    }

    async get({ deviceId, userId }) {
        let where = ``
        if (deviceId) where += ` AND id = :deviceId`
        if (userId) where += ` AND id IN(select device_id AS id FROM user_device WHERE user_id = :userId)`
        return await mysqlQuery(`
        SELECT * FROM device
        where true
        ${where};
        `, { deviceId, userId })
    }
}