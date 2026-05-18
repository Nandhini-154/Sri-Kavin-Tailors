const mongoose = require("mongoose");

const catalogueSchema = new mongoose.Schema({

    title: {
        type: String
    },

    mainCategory: {
        type: String
    },

    subCategory: {
        type: String
    },

    modelId: {
        type: String
    },

    image: {
        type: String
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model(
    "Catalogue",
    catalogueSchema,
    "catalogue"
);