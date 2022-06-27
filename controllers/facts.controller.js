const mongoose = require("mongoose");
var model = require('../data/historicalevents-model');
const HistoricalEvent = model.HistoricalEvent;//mongoose.model(process.env.HISTORICALEVENT_MODEL);

const getAll = function (req, res) {
    console.log("GET facts Controller");
    const historicalEventId = req.params.historicalEventId;
    HistoricalEvent.findById(historicalEventId).select("facts").exec(function (err, historicalEvent) {
        console.log("Found facts ", historicalEvent.facts, " for Game ", historicalEvent);
        res.status(200).json(historicalEvent.facts);
    });
}

const addOne = function (req, res) {
    console.log("Add One Facts Controller");
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
            _addFacts(req, res, historicalEvent);
        } else {
            res.status(response.status).json(response.message);
        }
    });
}

const _addFacts = function (req, res, historicalEvent) {
    
    var newFact = {
        description: req.body.description,
        humaninvolved: req.body.humaninvolved
    }
    historicalEvent.facts.push(newFact);
    
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


const deleteOne = function (req, res) {
    console.log("Delete One Fact Controller");
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
            _deleteFact(req, res, historicalEvent);
        } else {
            res.status(response.status).json(response.message);
        }
    });
}

const _deleteFact = function (req, res, historicalEvent) {
    
    
    for(let i=0;i<historicalEvent.facts.length;i++){
        if(historicalEvent.facts[i]._id == req.params.factId){
            historicalEvent.facts.splice(i,1);
        }
    }
    
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


const updateOne = function (req, res) {
    console.log("Update One Fact Controller");
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
            _updateFacts(req, res, historicalEvent);
        } else {
            res.status(response.status).json(response.message);
        }
    });
}

const _updateFacts = function (req, res, historicalEvent) {
    
    
    for(let i=0;i<historicalEvent.facts.length;i++){
        if(historicalEvent.facts[i]._id == req.body.id){
            historicalEvent.facts[i].description = req.body.description;
            historicalEvent.facts[i].humaninvolved = req.body.humaninvolved;
            break;
        }
    }    
    
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
    getAll: getAll,
    addOne: addOne,
    updateOne: updateOne,
    deleteOne: deleteOne
}