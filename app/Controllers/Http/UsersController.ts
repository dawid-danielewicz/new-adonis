import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from "App/Models/User";
import Hash from "@ioc:Adonis/Core/Hash";
import UserRegisterValidator from "App/Validators/UserRegisterValidator";
import UserLoginValidator from "App/Validators/UserLoginValidator";

export default class UsersController {
  public async register({ request, response }: HttpContextContract) {
    await request.validate(UserRegisterValidator)
    const user = new User()
    user.email = request.input('email')
    user.password = request.input('password')
    user.name = request.input('name')

    await user.save()

    return response.send({ message: 'User has been registered' })
  }

  public async login({ auth, request, response }: HttpContextContract) {
    await request.validate(UserLoginValidator)
    const { email, password } = request.all()
    const user = await User.query().where('email', email).first()

    if(user == null) {
      return response.unauthorized({ message: 'Invalid Credentials' })
    }

    if(!(await Hash.verify(user.password, password)) || (user.email != email)) {
      return response.unauthorized({ message: 'Invalid Credentials' })
    }

    const token = await auth.use('api').generate(user)

    return token
  }
}
