const mqtt = require('mqtt')

export default class Mqtt {
  protected static mqtt_host = 'mqtt://192.168.0.102'

  public static async publishToThing(email, id, endpoint, message) {
    const client = mqtt.connect(Mqtt.mqtt_host)
    let topic = email + '/' + id + endpoint
    let options = {
      qos: 1
    }

    client.on('connect', () => {
      client.publish(topic, message, options)
    })
  }

  public static async publishGroupMessage(email, ids, endpoint, message) {
    const client = mqtt.connect(Mqtt.mqtt_host)
    let options = {
      qos: 1
    }

    client.on('connect', () => {
      for (const id of ids) {
        let topic = email + '/' + id + endpoint
        client.publish(topic, message, options)
      }
    })
  }

  public static async publishGroupMessages(email, ids, parameters) {
    const client = mqtt.connect(Mqtt.mqtt_host)
    let options = {
      qos: 1
    }

    client.on('connect', () => {
      for (const id of ids) {
        for (const parameter of parameters) {
          let topic = email + '/' + id + parameter.endpoint
          client.publish(topic, parameter.message, options)
        }
      }
    })
  }

}
