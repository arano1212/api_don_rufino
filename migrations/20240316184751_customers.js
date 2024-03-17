/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.hasTable('customers')
    .then((exists)=>{
        if(!exists){
            return knex.schema.createTable('customers', (table)=>{
                table.increments("customer_id").primary();
                table.string("first_name").notNullable();
                table.string ("last_name").notNullable();
                table.string("phone").notNullable();
                table.string("address").notNullable();
                table.string ("postal_code").notNullable();
                table.string("neighborhood").notNullable();
                table.string("city").notNullable();
                table.boolean("active").notNullable().defaultTo(true);
                table.timestamp("created_at").defaultTo(knex.fn.now());g


            })
        }
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    knex.schema.dropTable('customers')
  
};
