const mongoose = require("mongoose");
var model = require('../data/historicalevents-model');
const HistoricalEvent = model.HistoricalEvent; //mongoose.model(process.env.HISTORICALEVENT_MODEL);





const addOne = function (req, res) {
    console.log("request body countroller:::",req.body);
    const newHistoricalEvent = {
        name: req.body.name, 
        year: req.body.year, 
        country: req.body.country, 
        facts: [], 
        
    };
    console.log("Historical Event AddOne request",newHistoricalEvent);
    HistoricalEvent.create(newHistoricalEvent, function (err, historicalEvent) {
        const response = { status: 201, message: historicalEvent };
        if (err) {
            console.log("Error creating historicalEvent");
            response.status = 500;
            response.message = err;
        }
        res.status(response.status).json(response.message);
    });
}




const getAll = function (req, res) {
    let offset = 0;
    let count = 5;
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }
    if (req.query && req.query.count) {
        offset = parseInt(req.query.count, 10);
    }
    HistoricalEvent.find().skip(offset).limit(count).exec(function (err, historicalEvents) {
        console.log("Found historical events", historicalEvents.length);
        res.json(historicalEvents);
    });
}

const getOne = function (req, res) {
    const historicalEventId = req.params.historicalEventId;
    HistoricalEvent.findById(historicalEventId).exec(function (err, historicalEvent) {
        res.status(200).json(historicalEvent);
    });
}

const deleteOne = function (req, res) {
    console.log("req.params:::",req.params);
    const historicalEventId = req.params.historicalEventId;
    console.log("historical Event id***",historicalEventId,"***");
    HistoricalEvent.findByIdAndDelete(historicalEventId).exec(function (err, deletedHistoricalEvent) {
        const response = { status: 204, message: deletedHistoricalEvent };
        if (err) {
            console.log("Error finding historical event");
            response.status = 500;
            response.message = err;
        } else if (!deletedHistoricalEvent) {
            console.log("historical event id not found");
            response.status = 404;
            response.message = {
                "message": "historical event ID not found"
            };
        }
        res.status(response.status).json(response.message);
    });
}

const fullUpdateOne = function (req, res) {
    console.log("Update One Historical Event Controller");
    const historicalEventId = req.params.historicalEventId;
    HistoricalEvent.findById(historicalEventId).select("facts").exec(function (err, historicalEvent) {
        console.log("Found Historical Event ", historicalEvent);
        const response = { status: 200, message: historicalEvent };
        if (err) {
            console.log("Error finding Historical Event");
            response.status = 500;
            response.message = err;
        } else if (!historicalEvent) {
            console.log("Error finding Historical Event");
            response.status = 404;
            response.message = { "message": "Historical Event ID not found " + historicalEventId };
        }
        if (historicalEvent) {
            _updateHistoricalEvent(req, res, historicalEvent);
        } else {
            res.status(response.status).json(response.message);
        }
    });
}

const _updateHistoricalEvent = function (req, res, historicalEvent) {
    
    
    historicalEvent.name = req.body.id;
    historicalEvent.year = req.body.year;
    historicalEvent.country = req.body.country;
    /*
    for(let i=0;i<historicalEvent.facts.length;i++){
        if(historicalEvent.facts[i]._id == req.body.id){
            historicalEvent.facts[i].description = req.body.description;
            historicalEvent.facts[i].humaninvolved = req.body.humaninvolved;
            break;
        }
    }    */
    
    historicalEvent.save(function (err, updatedHistoricalEvent) {
        const response = { status: 200, message: [] };
        if (err) {
            response.status = 500;
            response.message = err;
        } else {
            response.status = 201;
            response.message = updatedHistoricalEvent.facts;
        }
        res.status(response.status).json(response.message);
    });
}





module.exports = {
    addOne: addOne,
    getOne: getOne,
    getAll: getAll,
    fullUpdateOne: fullUpdateOne,
    deleteOne: deleteOne
}


/*
const getAll = function (req, res) {
    let offset = 0;
    let count = 5;
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }
    if (req.query && req.query.count) {
        offset = parseInt(req.query.count, 10);
    }
    HistoricalEvent.find().exec(function (err, historicalEvents) {
        console.log("Found historical events", historicalEvents.length);
        res.json(historicalEvents);
    });

}*/

/*
const getOne = function (req, res) {
    console.log("GET One Fact Controller");
    const historicalEventId = req.params.gameId;
    HistoricalEvent.findById(historicalEventId).select("facts").exec(function (err, historicalEvent) {
        console.log("Found facts ", historicalEvent.fact, " for historical events ", historicalEvent);
        res.status(200).json(historicalEvent.fact);
    });
}*/

