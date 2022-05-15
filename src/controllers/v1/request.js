import { transforms } from "json2csv";
import { Parser} from "json2csv";
import DeviceModel from "../../models/device.js";
import RequestModel from "../../models/request.js";


export default class RequestController {
    _requestModel = new RequestModel()
    _deviceModel = new DeviceModel()

    async getRequests(req, res) {
        const { userId, type, deviceId } = req.params
        const { startDate, endDate } = req.query
        

        let { deviceIds = [] } = req.params;
        let requests
        if (userId) {
            const res = await this._deviceModel.get({ userId });
            deviceIds = await (res || []).map(({ id }) => id)
        }
        if (deviceId) deviceIds.push(deviceId)
        if (deviceIds) {
            const res = await this._requestModel.get({ deviceIds, startDate, endDate });
            requests = res
        }
        console.log(requests)
        if (type && deviceId) {
            if (type === 'csv') {
                let csvData
                const device = await this._deviceModel.get({deviceId})
    
                if (device[0].name) {
                    csvData = this.getDeviceDataAsCSV(requests, device[0].name);
                    res.header('Content-Type', 'text/csv');
                    res.attachment(device[0].name + '.csv');    
                } else {
                    csvData = this.getDeviceDataAsCSV(requests, 'NAME_NOT_FOUND');
                    res.header('Content-Type', 'text/csv');
                    res.attachment(deviceId + '.csv');
                }
                
                return res.send(csvData)
            }
        }
        if (type) {
            if (type === 'csv') {
                csv = getRequestsAsCsv(requests)
                res.header('Content-Type', 'text/csv');
                res.attachment('device_data.csv');
                return res.send(csv)
            }
        }
        res.send({ requests })
    }

    getDeviceDataAsCSV (deviceIds, name) {
        const result = []
        console.log("device ids", deviceIds)
        if (deviceIds.length < 1) {
            console.log("HEJ")
            return [{error: "No data was found for the selected "}]
        }
        
        for (const device of deviceIds) {
            if (device.decoded_payload) {
                let reqData = this.flattenObject(device.decoded_payload)
                reqData.id = device.id
                reqData.created = device.created
                reqData.sensorName = name
                result.push(reqData)
            }
        }
        const json2csvParser = new Parser();
        return json2csvParser.parse(result)
    }

    flattenObject (obj){
        let flattenKeys = {};
        for (let i in obj) {
            if (!obj.hasOwnProperty(i)) continue;
            if ((typeof obj[i]) == 'object') {
                // flattenKeys[i] = obj[i];
                let flatObject = this.flattenObject(obj[i]);
                for (let j in flatObject) {
                    if (!flatObject.hasOwnProperty(j)) continue;
                    flattenKeys[i + '.' + j] = flatObject[j];
                }
            } else {
                flattenKeys[i] = obj[i];
            }
        }
        return flattenKeys;
    }

    getRequestsAsCsv (requests) {
        const uniqueDevices = new Set();
        const labels = new Set();
        const formattedData = []
        
        for (const data of requests) {
            if (data.device_id === 'c0fdf388-1c4f-4c15-9e85-4b62660fa17b') {
                formattedData.push(data)
            }
            uniqueDevices.add(data.device_id)
        }
        
        console.log(formattedData)
        console.log(uniqueDevices)
        const fields = [
            'id', 
            'device_id',
            'created',
            'decoded_payload.oxygen_concentration.value',
            'decoded_payload.oxygen_concentration_alt.value',
            'decoded_payload.oxygen_saturation.value',
            'decoded_payload.temperature.value'
        ]
        const transforms = [ transforms({ paths: ['decoded_payload.oxygen_concentration', 'decoded_payload.oxygen_concentration_alt', 'decoded_payload.oxygen_saturation', 'decoded_payload.temperature'] }) ]
    
        const json2csvParser = new Parser({ fields, transforms })
        const csv = json2csvParser.parse(formattedData)
        return csv
    }
}