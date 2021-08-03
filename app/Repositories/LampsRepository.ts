
export default class LampsRepository {
  public static async toggleSync(thing, request) {
    thing.sync = request.input('sync')
    await thing.save()
  }

  public static async updateSensor(thing, request) {
    thing.temperature = request.input('temperature')
    thing.humidity = request.input('humidity')
    await thing.save()
  }

  public static async updateLamp(thing, request) {
    thing.lamp = request.input('lamp')
    await thing.save()
  }

  public static async updateBrightness(thing, request) {
    thing.brightness = request.input('brightness')
    await thing.save()
  }

  public static async setTimer(thing, request) {
    thing.timer = request.input('timer')
    thing.start_hour = request.input('start_hour')
    thing.stop_hour = request.input('stop_hour')
    await thing.save()
  }

  public static async updateTimer(thing, request) {
    thing.start_hour = request.input('start_hour')
    thing.stop_hour = request.input('stop_hour')
    await thing.save()
  }

  public static async setMoveSensor(thing, request) {
    thing.move_sensor = request.input('move_sensor')
    await thing.save()
  }

  public static async toggleMove(thing, request) {
    thing.is_move = request.input('is_move')
    await thing.save()
  }
}
