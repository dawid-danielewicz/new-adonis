/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  Route.get('/things', 'ThingsController.index').as('things.index')
  Route.post('/things', 'ThingsController.store').as('things.create')
  Route.get('/things/:id', 'ThingsController.show').as('things.show')
  Route.put('/things/:id', 'ThingsController.update').as('things.update')
  Route.delete('/things/:id', 'ThingsController.destroy').as('things.delete')
  Route.put('/things/:id/sensor', 'ThingsController.updateSensor').as('things.sensor')
  Route.put('/things/:id/lamp', 'ThingsController.updateLamp').as('things.lamp')
}).middleware('auth')

Route.post('/register', 'UsersController.register').as('register')
Route.post('/login', 'UsersController.login').as('login')
