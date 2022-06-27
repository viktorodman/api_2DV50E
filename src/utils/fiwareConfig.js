import { dlCTD10Translator } from "../translators/dl-ctd10.js";
import { dlLP8PTranslator } from "../translators/dl-lp8p.js";
import { dlOPTODTranslator } from "../translators/dl-optod.js";
import { dlPMTranslator } from "../translators/dl-pm.js";
import { ldds75Translator } from "../translators/ldds75.js";
import { meteoHelixTranslator } from "../translators/meteohelix.js";
import { meteoWindTranslator } from "../translators/meteowind.js";

export const translateRequestData = (device, requests) => {
    let data;

    console.log("here", device.label)

    switch(device.label) {
        case "4d730c5d-6e83-4022-8f6b-07a5b1618afa": // MeteoHelix
            data = meteoHelixTranslator(requests, device)
            break;
        case "1f913bcc-53ca-4251-853d-407caea9cc93": // MeteoWind
            data = meteoWindTranslator(requests, device)
            break;
        case "f0dc7536-bb20-4c02-9fe4-ce473d0f43cc": // ldds75
            data = ldds75Translator(requests, device)
            break;
        case "61da58c8-5c44-43ef-af4c-ef2b0728998b": // dl-pm
            data = dlPMTranslator(requests, device)
            break;
        case "2ea904fd-4faa-416c-b8bf-85dbfd3cebec": // dl-optod
            data = dlOPTODTranslator(requests, device)
            break;
        case "0eb9e13b-a5ce-41b7-837d-a84ed2388e9a": // dl-LP8P8
            data = dlLP8PTranslator(requests, device)
            break;
        case "885f3a80-8782-4e8a-876e-ed254972f8d4": // dl-CTD10
            data = dlCTD10Translator(requests, device)
            break;
        default:
            throw new Error('yeah')
    }

    return data
} 

export const translateDeviceData = (devices) => {

    if (devices.length < 1) {
        return []
    }

    devices.forEach(device => {
        switch(device.label) {
            case "4d730c5d-6e83-4022-8f6b-07a5b1618afa": // MeteoHelix
                device.deviceType = "WeatherObserved"
                break;
            case "1f913bcc-53ca-4251-853d-407caea9cc93": // MeteoWind
                device.deviceType = "WeatherObserved"
                break;
            case "f0dc7536-bb20-4c02-9fe4-ce473d0f43cc": // ldds75
                device.deviceType = "DistanceObserved"
                break;
            case "61da58c8-5c44-43ef-af4c-ef2b0728998b": // dl-pm
                device.deviceType = "AirQualityObserved"
                break;
            case "2ea904fd-4faa-416c-b8bf-85dbfd3cebec": // dl-optod
                device.deviceType = "AirQualityObserved"
                break;
            case "0eb9e13b-a5ce-41b7-837d-a84ed2388e9a": // dl-LP8P8
                device.deviceType = "AirQualityObserved"
                break;
                case "885f3a80-8782-4e8a-876e-ed254972f8d4": // dl-CTD10
                device.deviceType = "WaterQualityObserved"
                break;
            default:
                device.deviceType = "Other"
    
        } 
    });
}