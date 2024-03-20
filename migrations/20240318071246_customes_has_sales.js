/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.hasTable('sales')
        .then((exists) => {
            if (!exists) {
                return knex.schema.createTable('sales', (table) => {
                    table.increments("sale_id").primary();
                    table.integer("customer_id").unsigned().notNullable();
                    table.foreign("customer_id").references("customer_id").inTable("customers");
                    table.integer("product_id").unsigned().notNullable();
                    table.foreign("product_id").references("product_id").inTable("products");
                    table.integer("quantity").unsigned().notNullable();
                    table.boolean("active").notNullable().defaultTo(true);
                    table.timestamp("created_at").defaultTo(knex.fn.now());


                })
            }
        })

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('sales');
};
