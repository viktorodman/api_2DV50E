export const dlOPTODTranslator = (requests, device) => {
    
    return requests.map((request) => {
        const payload = request.decoded_payload
        return {
            id: device.id,
            type: "AirQualityObserved",
            dateObserved: {
                type: "DateTime",
                value: request.created
            },
            battery: {
                type: "Number",
                value:  payload.battery_voltage.value
            },
            O2: {
                type: "Number",
                value: payload.oxygen_concentration.value
            },
            O2Saturation: {
                type: "Number",
                value: payload.oxygen_saturation.value
            } ,
            temperature: {
                type: "Number",
                value: payload.temperature.value
            },
            location: {
              type: "geo:json",
              value: {
                type: "Point",
                coordinates: [
                  device.lat,
                  device.lng,
                ]
              }
            },
          }
    })
}