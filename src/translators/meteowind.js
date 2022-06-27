export const meteoWindTranslator = (requests, device) => {
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
            windDirection: {
                type: "Number",
                value: payload.dir_ave10
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
          }
    })
}

export const meteoWindDeviceTranslator = () => {
  
}