const mongoose = require("mongoose");



conn = mongoose.connect('mongodb+srv://Harrish:1234@bank.avbxc.mongodb.net/Bank?retryWrites=true&w=majority', {useNewUrlParser: true})

module.exports = conn;