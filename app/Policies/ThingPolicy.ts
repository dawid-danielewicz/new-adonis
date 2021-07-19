import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'
import Thing from 'App/Models/Thing'

export default class ThingPolicy extends BasePolicy {
	public async view(user: User, thing: Thing) {
	  return thing.user_id === user.id
  }
	public async update(user: User, thing: Thing) {
	  return thing.user_id === user.id
  }
	public async delete(user: User, thing: Thing) {
	  return thing.user_id === user.id
  }
  public async sensor(user: User, thing: Thing) {
	  return thing.user_id === user.id
  }
  public async lamp(user: User, thing: Thing) {
	  return thing.user_id === user.id
  }
}
