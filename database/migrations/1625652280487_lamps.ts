import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Things extends BaseSchema {
  protected tableName = 'lamps'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.string('name')
      table.string('group')
      table.boolean('sync').defaultTo(false)
      table.boolean('lamp').defaultTo(false)
      table.integer('brightness')
      table.string('humidity')
      table.string('temperature')
      table.boolean('timer').defaultTo(false)
      table.string('start_hour')
      table.string('stop_hour')
      table.boolean('move_sensor').defaultTo(false)
      table.boolean('is_move').defaultTo(false)

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamps(true, true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
