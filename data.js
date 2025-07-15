// data.js
const pool = require("./config/db"); ;

const createTables = async () => {
  try {
    // USERS TABLE
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL
      );
    `);

    // EVENTS TABLE
    await pool.query(`
      CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        date TIMESTAMP NOT NULL,
        location VARCHAR(255) NOT NULL,
        capacity INT NOT NULL CHECK (capacity > 0 AND capacity <= 1000),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // REGISTRATIONS TABLE
    await pool.query(`
      CREATE TABLE IF NOT EXISTS registrations (
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        event_id INT NOT NULL REFERENCES events(id) ON DELETE CASCADE,
        registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE (user_id, event_id)
      );
    `);

    console.log(" All tables created successfully.");
    process.exit();
  } catch (err) {
    console.error(" Error creating tables:", err.message);
    process.exit(1);
  }
};

createTables();