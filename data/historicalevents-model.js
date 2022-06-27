const mongoose= require("mongoose");

const factSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    humaninvolved: [String]
});
const historicalEventSchema = new mongoose.Schema({
    name: String,
    year: Number,
    country: String,
    /*
    name: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        min : 1,
        required: true
    },
    country: {
        type: String,
        required: true
    },*/
    facts: [factSchema]
});

var HistoricalEvent = mongoose.model("HistoricalEvent", historicalEventSchema, "historicalEvents");

module.exports={
    HistoricalEvent: HistoricalEvent    
}