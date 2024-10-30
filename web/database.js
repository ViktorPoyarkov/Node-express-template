import mysql from 'mysql2'

const pool = mysql.createPool(process.env.DATABASE_URL).promise();

async function createCart(customerId, cart) {
    const [result] = await pool.query(`
            INSERT INTO carts (customer_id, cart)
            VALUES (?, ?)
        `, [customerId, cart])
    const id = result.insertId
    console.log(id);
}

async function updateCart(customerId, cart) {
    const [result] = await pool.query(`
            UPDATE carts
            SET cart = ?
            WHERE customer_id = ?
        `, [cart, customerId])
    console.log('Affected rows: ' + result.affectedRows);
}
export async function createOrUpdateCart(customerId, cart) {
    const [rows] = await pool.query(`
      SELECT * 
      FROM carts
      WHERE customer_id = ?
      `, [customerId]);
    if (rows === undefined) {
        createCart(customerId, cart);
    } else {
        updateCart(customerId, cart);
    }
}
