const Booking = require('../models/Booking');

// Create new booking
exports.createBooking = async (req, res) => {
  try {
    const { serviceId, date } = req.body;
    const booking = new Booking({
      user: req.user.id,
      service: serviceId,
      date
    });
    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get user bookings
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('service');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};