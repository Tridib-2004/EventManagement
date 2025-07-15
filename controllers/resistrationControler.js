
const db = require("../config/db");

// Register User for Event

exports.registerUser = async (req, res) => {
  const { userId } = req.body;
  const eventId = req.params.id;

  try {
    const eventRes = await db.query(
      `SELECT date, capacity, 
      (SELECT COUNT(*) FROM registrations WHERE event_id = $1) as registered
      FROM events WHERE id = $1`, [eventId]);

    if (eventRes.rows.length === 0) return res.status(404).json({ error: "Event not found" });

    const { date, capacity, registered } = eventRes.rows[0];
    if (new Date(date) < new Date()) return res.status(400).json({ error: "Cannot register for past event" });
    if (registered >= capacity) return res.status(400).json({ error: "Event is full" });

    await db.query(
      "INSERT INTO registrations (user_id, event_id) VALUES ($1, $2)",
      [userId, eventId]
    );

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    if (err.code === '23505') {
      res.status(400).json({ error: "User already registered" });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
};

// Cancel Registration
exports.cancelRegistration = async (req, res) => {
  const { userId } = req.body;
  const eventId = req.params.id;

  try {
    const result = await db.query(
      "DELETE FROM registrations WHERE user_id = $1 AND event_id = $2 RETURNING *",
      [userId, eventId]
    );
    if (result.rowCount === 0) {
      return res.status(400).json({ error: "User was not registered for this event" });
    }
    res.json({ message: "Registration cancelled" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};