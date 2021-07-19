import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Things extends BaseSchema {
  protected tableName = 'things'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.string('name')
      table.string('group')
      table.boolean('lamp').defaultTo(false)
      table.string('humidity')
      table.string('temperature')

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
