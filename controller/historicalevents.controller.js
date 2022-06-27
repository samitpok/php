const mongoose = require("mongoose");
const HistoricalEvent = mongoose.model(process.env.HISTORICALEVENT_MODEL);

const getAll = function(req,res){
    let offset = 0;
    let count = 5;
    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset,10);
    }
    if(req.query && req.query.count){
        offset = parseInt(req.query.count,10);
    }
    HistoricalEvent.find().exec(function(err,historicalEvents){
        console.log("Found historical events",historicalEvents.length);
        res.json(historicalEvents);
    });

}