import { mysqlQuery } from "../utils/database.js";

export default class RequestModel {
    
    async upsert(request) {
        const { decoded } = request;
        const processedPayload = getProcessedPayload(decoded.payload)
        await mysqlQuery(
            `INSERT INTO request
            (device_id, type, payload, decoded_payload, battery_percent, battery_volt)
            values (:id, :type, :payload, :payloadAsJson, :batteryPercent, :batteryVolt)`,
            {...request, ...processedPayload}
        )
    }

    async get({ deviceId, deviceIds, startDate, endDate }) {
        let where = ``
        if (deviceId) where += ` AND device_id = :deviceId`
        if (deviceIds?.length) where += ` AND device_id IN(:deviceIds)`
        console.log('first')


        if (startDate && endDate) {
            console.log('1')
            where += ` AND date(created) between date(${startDate}) and date(${endDate})`
        } else if (startDate) {
            console.log('2')
            where += ` AND date(created) >= date(${startDate})`
        } else if (endDate){
            console.log('3')
            where += ` AND date(created) <= date(${endDate})`
        }

        const requests = await mysqlQuery(`
        SELECT * FROM request
        where true
        ${where}
        order by created desc;
        `, { deviceId, deviceIds })
        return requests.map((request) => {
            try {
                request.decoded_payload = JSON.parse(request.decoded_payload)
            } catch (e) {
                console.log(e)
            }
            return request;
        })
    }

    _getProcessedPayload(payload = {}) {
        const { battery, battery_volt, battery_percent } = payload;
        let batteryVolt = battery_volt || battery
        let batteryPercent = battery_percent;
        let payloadAsJson = JSON.stringify(payload)

        return { 
            batteryVolt,
            batteryPercent,
            payloadAsJson
        }
    }
}