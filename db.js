require("dotenv").config();
const mongoose = require("mongoose");

const url_schema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
});
