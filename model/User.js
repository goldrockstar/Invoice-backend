const mongoose = require("mongoose");

// This array defines all the valid categories you specified.
const allCategories = [
    'sparklers',
    'one sound cracker',
    'ground chakkars',
    'flower pots',
    'bomb items',
    'rocket',
    'twinklingstar',
    'pencils',
    'bijili cracker',
    'aerial fancy',
    'repeating shots',
    'fancy novelties(krishna fireworks)',
    'sizzling shield',
    'peacock series',
    'variety fountains',
    'new arrivals fountains',
    "kutty chutti's special"
];

// Sparkler Data Schema - For storing the complete list of products
const sparklerItemSchema = new mongoose.Schema({
    items: {
        type: String,
        required: true
    },
    mrp: {
        type: Number, 
        required: true
    },
    discount: {
        type: Number, 
        required: true
    }
}, { _id: false });

const sparklersDataSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        unique: true,
        enum: allCategories
    },
    sparklers_list: {
        type: [sparklerItemSchema],
        required: true
    }
});

// Invoice Item Schema - For storing a single item in a customer's invoice
const invoiceItemSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        enum: allCategories
    },
    items: {
        type: String,
        required: true
    },
    mrp: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true,
        default: 0
    },
    total: {
        type: Number,
        required: true
    }
});

module.exports = {
    SparklersData: mongoose.model("SparklersData", sparklersDataSchema),
    InvoiceItem: mongoose.model("InvoiceItem", invoiceItemSchema)
};
