const Booking = require('../models/Booking.js')

module.exports = {
    async store(req, res) {
        const { booking_id } = req.params

        const booking = await Booking.findById(booking_id).populate('spot')
        booking.approved = true
        await booking.save()

        const bookingUserSocket = req.connectedUsers[booking.user]

        if (bookingUserSocket) {
            console.log('enviando para o user ' + booking.user)
            req.io.to(bookingUserSocket).emit('booking_response', booking)
        }

        return res.json(booking)
    }
}