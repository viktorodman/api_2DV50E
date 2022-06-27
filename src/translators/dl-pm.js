export const dlPMTranslator = (requests, device) => {
    
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
            temperature: {
                type: "Number",
                value: payload.air_temperature.value
            },
            relativeHumidity: {
                type: "Number",
                value: payload.air_humidity.value
            },
            barometricPressure: {
                type: "Number",
                value: payload.barometric_pressure.value
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