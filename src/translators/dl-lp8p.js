export const dlLP8PTranslator = (requests, device) => {
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
                value:  payload.battery_voltage
            },
            temperature: {
                type: "Number",
                value: payload.air_temperature
            },
            barometricTemperature: {
                type: "Number",
                value: payload.barometer_temperature
            },
            relativeHumidity: {
                type: "Number",
                value: payload.air_humidity
            },
            barometricPressure: {
                type: "Number",
                value: payload.barometric_pressure
            },
            co2: {
                type: "Number",
                value: payload.co2_concentration
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