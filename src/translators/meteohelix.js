export const meteoHelixTranslator = (requests, device) => {
    
    return requests.map((request) => {
        const payload = request.decoded_payload
        return {
            id: device.id,
            type: "WeatherObserved",
            dateObserved: {
                type: "DateTime",
                value: request.created
            },
            battery: {
                type: "Number",
                value: payload.battery
            },
            relativeHumidity: {
                type: "Number",
                value: payload.humidity
            },
            solarIrradiation: {
                type: "Number",
                value: payload.irradiation
            },
            precipitation: {
                type: "Number",
                value: payload.rain
            },
            atmosphericPressure: {
                type: "Number",
                value: payload.pressure
            },
            temperature: {
                type: "Number",
                value: payload.temperature
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
    
    
    /* {
        id: device.id,
        type: "WeatherObserved",
        dateObserved: {
            type: "DateTime",
            value: payload.created
        },
        battery: {
            type: "Number",
            value: payload.battery
        },
        relativeHumidity: {
            type: "Number",
            "value": requests.humidity
        },
        windSpeed: {
            type: "Number",
            value: payload.wind_ave10
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
      } */
}