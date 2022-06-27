export const dlCTD10Translator = (requests, device) => {
    const data = [];

    for (const request of requests) {
      const payload = request.decoded_payload
      if (payload && Object.keys(payload).length > 0) {
        data.push(
          {
            id: device.id,
            type: "WaterQualityObserved",
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
                value: payload.temperature.value
            },
            conductivity: {
                type: "Number",
                value: payload.electrical_conductivity.value
            },
            waterDepth: {
                type: "Number",
                value: payload.water_depth.value
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
        )
      }
    }

    return data

    /* return requests.map((request) => {
        if(Object.keys(payload).length > 0)
        const payload = request.decoded_payload
        
    }) */
}