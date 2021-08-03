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
  Route.get('/things', 'LampsController.index').as('things.index')
  Route.post('/things', 'LampsController.store').as('things.create')
  Route.get('/things/:id', 'LampsController.show').as('things.show')
  Route.put('/things/:id', 'LampsController.update').as('things.update')
  Route.delete('/things/:id', 'LampsController.destroy').as('things.delete')
  Route.put('/things/:id/sensor', 'LampsController.updateSensor').as('things.sensor')
  Route.put('/things/:id/lamp', 'LampsController.updateLamp').as('things.lamp')
  Route.put('/things/:id/brightness', 'LampsController.updateBrightness').as('things.brightness')
  Route.put('/things/:id/timer', 'LampsController.setTimer').as('things.timer')
  Route.put('/things/:id/timerUpdate', 'LampsController.updateTimer').as('things.timerUpdate')
  Route.put('/things/:id/moveSensor', 'LampsController.setMoveSensor').as('things.moveSensor')
  Route.put('/things/:id/move', 'LampsController.toggleMove').as('things.move')
  Route.put('/things/:id/sync', 'LampsController.toggleSync').as('things.sync')

  Route.get('/user', 'UsersController.user').as('user')
}).middleware('auth')

Route.post('/register', 'UsersController.register').as('register')
Route.post('/login', 'UsersController.login').as('login')
