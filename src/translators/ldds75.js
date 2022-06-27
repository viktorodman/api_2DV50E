export const ldds75Translator = (requests, device) => {
    
    return requests.map((request) => {
        const payload = request.decoded_payload


        return {
            id: device.id,
            type: "DistanceObserved",
            dateObserved: {
                type: "DateTime",
                value: request.created
            },
            battery: {
                type: "Number",
                value:  payload === null ? null : (payload["Bat"] || payload.battery)
            },
            distance: {
                type: "Number",
                value: payload === null ? null : (payload.distance || payload["Distance"])
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