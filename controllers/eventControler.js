const db = require("../config/db");
// Create Event
exports.createEvent = async (req, res) => {
  const { title, date, location, capacity } = req.body;
  if (!title || !date || !capacity || capacity > 1000 || capacity <= 0) {
    return res.status(400).json({ error: "Invalid input data" });
  }
  try {
    const result = await db.query(
      "INSERT INTO events (title, date, location, capacity) VALUES ($1, $2, $3, $4) RETURNING id",
      [title, date, location, capacity]
    );
    res.status(201).json({ eventId: result.rows[0].id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Get Event Details with Users
exports.getEventDetails = async (req, res) => {
  const id = req.params.id;
  try {
    const event = await db.query("SELECT * FROM events WHERE id = $1", [id]);
    if( event.rows.length === 0) {
      return res.status(404).json({ error: "Event not found" });
    }
    const users = await db.query(
      `SELECT u.id, u.name, u.email FROM users u
       JOIN registrations r ON u.id = r.user_id
       WHERE r.event_id = $1`, [id]);

    if (users.rows.length === 0) {
     console.log("No users registered for this event.");
    }

    res.json({ ...event.rows[0], registered_users: users.rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Upcoming Events Sorted
exports.getUpcomingEvents = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT * FROM events 
       WHERE date > NOW()
       ORDER BY date ASC, location ASC`
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Event Stats
exports.getEventStats = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await db.query(
      `SELECT e.capacity, 
              COUNT(r.id) as total_registrations, 
              e.capacity - COUNT(r.id) as remaining_capacity,
              ROUND(COUNT(r.id) * 100.0 / e.capacity, 2) as percentage_used
       FROM events e
       LEFT JOIN registrations r ON e.id = r.event_id
       WHERE e.id = $1
       GROUP BY e.id`, [id]);

    if (result.rows.length === 0) return res.status(404).json({ error: "Event not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};