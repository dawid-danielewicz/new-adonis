import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Lamp from "App/Models/Lamp";
import Ws from "App/Services/Ws";
import ThingsRepository from "App/Repositories/ThingsRepository";
import LampsRepository from "App/Repositories/LampsRepository";
import ThingValidator from "App/Validators/ThingValidator";

const mqtt = require('mqtt')

export default class LampsController {
  public async index({ response, auth }: HttpContextContract) {
    // @ts-ignore
    const user_id = auth.user.id
    const things = await ThingsRepository.userThings(Lamp, user_id)
    return response.send(things)
  }

  public async store({ request, response, auth }: HttpContextContract) {
    await request.validate(ThingValidator)
    // @ts-ignore
    const user = auth.user.id
    await ThingsRepository.createThing(Lamp, request, user)

    return response.send({ message: 'Lamp has been created' })
  }

  public async show({ response, params, bouncer }: HttpContextContract) {
    const thing = await ThingsRepository.getThing(Lamp, params)
    await bouncer.with('ThingPolicy').authorize('view', thing)

    return response.send(thing)
  }

  public async update({ request, response, params, bouncer }: HttpContextContract) {
    await request.validate(ThingValidator)
    const thing = await ThingsRepository.getThing(Lamp, params)
    await bouncer.with('ThingPolicy').authorize('update', thing)

    await ThingsRepository.updateThing(thing, request)

    return response.send({message: 'Lamp has been updated'})
  }

  public async destroy({ params, response, bouncer }: HttpContextContract) {
    const thing = await ThingsRepository.getThing(Lamp, params)
    await bouncer.with('ThingPolicy').authorize('delete', thing)

    await ThingsRepository.deleteThing(thing)

    return response.send({ message: 'Lamp has been deleted' })
  }

  public async toggleSync({ request, response, params, bouncer }: HttpContextContract) {
    const thing = await Lamp.findOrFail(params.id)
    await bouncer.with('ThingPolicy').authorize('lamp', thing)
    await LampsRepository.toggleSync(thing, request)

    return response.send({ message: 'Sync has been toggled' })
  }

  public async updateSensor({ request, response, params, bouncer }: HttpContextContract) {
    const thing = await Lamp.findOrFail(params.id)
    await bouncer.with('ThingPolicy').authorize('sensor', thing)
    await LampsRepository.updateSensor(thing, request)

    return response.status(200)

  }

  public async updateLamp({ request, response, params, bouncer }: HttpContextContract) {
    const mqtt_host = 'mqtt://192.168.0.102'
    const thing = await Lamp.findOrFail(params.id)
    await bouncer.with('ThingPolicy').authorize('lamp', thing)
    await LampsRepository.updateLamp(thing, request)

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

  public async updateBrightness({ request, response, params, bouncer }: HttpContextContract) {
    const thing = await Lamp.findOrFail(params.id)
    await bouncer.with('ThingPolicy').authorize('lamp', thing)
    await LampsRepository.updateBrightness(thing, request)
    if(thing.lamp === true) {
      // send message
    }

    return response.send({ message: 'Brightness updated' })

  }

  public async setTimer({ request, response, params, bouncer }: HttpContextContract) {
    const thing = await Lamp.findOrFail(params.id)
    await bouncer.with('ThingPolicy').authorize('lamp', thing)
    await LampsRepository.setTimer(thing, request)

    return response.send({ message: 'Timer is set' })
  }

  public async updateTimer({ request, response, params, bouncer }: HttpContextContract) {
    const thing = await Lamp.findOrFail(params.id)
    await bouncer.with('ThingPolicy').authorize('lamp', thing)
    await LampsRepository.updateTimer(thing, request)

    return response.send({ message: 'Timer has been updated' })
  }

  public async setMoveSensor({ request, response, params, bouncer }: HttpContextContract) {
    const thing = await Lamp.findOrFail(params.id)
    await bouncer.with('ThingPolicy').authorize('lamp', thing)
    await LampsRepository.setMoveSensor(thing, request)

    return response.send({ message: 'Sensor has been set' })
  }

  public async toggleMove({ request, response, params, bouncer }:HttpContextContract) {
    const thing = await Lamp.findOrFail(params.id)
    await bouncer.with('ThingPolicy').authorize('lamp', thing)
    await LampsRepository.toggleMove(thing, request)

    return response.send({ message: 'Move has been updated' })
  }
}
