import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Lamp extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public group: string

  @column()
  public lamp: boolean

  @column()
  public humidity: string

  @column()
  public temperature: string

  @column()
  public user_id: number

  @column()
  public brightness: number

  @column()
  public sync: boolean

  @column()
  public timer:boolean

  @column()
  public start_hour: string

  @column()
  public stop_hour: string

  @column()
  public move_sensor: boolean

  @column()
  public is_move: boolean


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
