/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
  .createTable('envelopes', (table) => {
    table.increments('id');
    table.string('name', 128).notNullable();
    table.float('balance', 2).notNullable();
  })
  .createTable('transactions', (table) => {
    table.increments('id');
    table.boolean('deduction');
    table.string('source', 128).notNullable();
    table.float('amount', 2).notNullable();
    table.integer('envelope_id').notNullable();
    table.string('description');
    table.timestamp('datetime').notNullable();
    table.foreign('envelope_id').references('envelopes.id');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('envelopes')
  .dropTableIfExists('transactions')
};
