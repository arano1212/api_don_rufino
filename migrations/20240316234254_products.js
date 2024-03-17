/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.hasTable('products')
    .then((exists)=>{
        if(!exists){
            return knex.schema.createTable('products', (table)=>{
                table.increments("product_id").primary();
                table.string('product_name', 150).notNullable();
                table.string('description', 255).notNullable();
                table.decimal('price', 10, 2).notNullable();
                table.string('sku', 25);
            })
        }
    })
  
    


  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('products');
  
};
