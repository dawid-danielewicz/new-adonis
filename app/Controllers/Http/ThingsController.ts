import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Thing from "App/Models/Thing";
import Ws from "App/Services/Ws";

import ThingValidator from "App/Validators/ThingValidator";
const mqtt = require('mqtt')

export default class ThingsController {
  public async index({ response, auth }: HttpContextContract) {
    // @ts-ignore
    const user_id = auth.user.id
    const things = await Thing.query().where('user_id', user_id)
    return response.send(things)
  }

  public async store({ request, response, auth }: HttpContextContract) {
    await request.validate(ThingValidator)
    // @ts-ignore
    const user = auth.user.id
    const thing = new Thing()

    thing.name = request.input('name')
    thing.group = request.input('group')
    thing.user_id = user

    await thing.save()

    return response.send({ message: 'Thing has been created' })
  }

  public async show({ response, params, bouncer }: HttpContextContract) {
    const thing = await Thing.findOrFail(params.id)
    await bouncer.with('ThingPolicy').authorize('view', thing)

    return response.send(thing)
  }

  public async update({ request, response, params, bouncer }: HttpContextContract) {
    await request.validate(ThingValidator)
    const thing = await Thing.findOrFail(params.id)
    await bouncer.with('ThingPolicy').authorize('update', thing)

    // @ts-ignore
    thing.name = request.input('name')

    // @ts-ignore
    thing.group = request.input('group')

    // @ts-ignore
    await thing.save()

    return response.send({message: 'Thing has been updated'})
  }

  public async destroy({ params, response, bouncer }: HttpContextContract) {
    const thing = await Thing.findOrFail(params.id)
    await bouncer.with('ThingPolicy').authorize('delete', thing)

    // @ts-ignore
    await thing.delete()

    return response.send({ message: 'Thing has been deleted' })
  }

  public async updateSensor({ request, response, params, bouncer }: HttpContextContract) {
    const thing = await Thing.findOrFail(params.id)
    await bouncer.with('ThingPolicy').authorize('sensor', thing)
    // @ts-ignore
    thing.humidity = request.input('humidity')
    // @ts-ignore
    thing.temperature = request.input('temperature')

    // @ts-ignore
    await thing.save()

    return response.status(200)

  }

  public async updateLamp({ request, response, params, bouncer }: HttpContextContract) {
    const mqtt_host = 'mqtt://192.168.0.102'
    const thing = await Thing.findOrFail(params.id)
    await bouncer.with('ThingPolicy').authorize('lamp', thing)
    // @ts-ignore
    thing.lamp = request.input('lamp')
    // @ts-ignore
    await thing.save()

    const client = mqtt.connect(mqtt_host)
    let topic = 'adres@email.com/' + params.id + '/lamp'
    const message = request.input('lamp')
    const options = {
      qos: 1
    }
    await client.on('connect', () => {
      client.publish(topic, message, options)
    })

    Ws.io.emit(`lamp:${thing.id}`, request.input('lamp'))

    return response.send({ message: 'Lamp status changed successfully' })

  }
}
