const mongoose = require('mongoose')

const SpotSchema = new mongoose.Schema({
    thumbnail: String,
    company: String,
    price: Number,
    techs: [String],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    toJSON: {
        virtuals: true
    }
})

SpotSchema.virtual('thumbnail_url').get(function() {
    const PORT = process.env.PORT || 3333;
    return `http://172.29.109.132:${PORT}/files/${this.thumbnail}`
})

module.exports = mongoose.model('Spot', SpotSchema)