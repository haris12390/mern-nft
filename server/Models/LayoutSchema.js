const mongoose = require('mongoose')

const LayoutSchema = new mongoose.Schema({
    Layout: { type: Object }
})

module.exports = mongoose.model('Layout', LayoutSchema)