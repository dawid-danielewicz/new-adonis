
export default class ThingsRepository {
  public static async userThings(model, user) {
    return await model.query().where('user_id', user)
  }

  public static async createThing(model, request, user) {
    const thing = new model()
    thing.name = request.input('name')
    thing.group = request.input('group')
    thing.user_id = user
    await thing.save()
  }

  public static async getThing(model, params) {
    return await model.findOrFail(params.id)
  }

  public static async updateThing(thing, request) {
    thing.name = request.input('name')
    thing.group = request.input('group')
    await thing.save()
  }

  public static async deleteThing(thing) {
    await thing.delete()
  }
}
