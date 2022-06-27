const express = require("express");
const router = express.Router();

router.get('/',(req,res)=>{
    res.send("get request for events");
});

router.post('/',(req,res)=>{
    res.send("create event");
});

// router.route("/events")
//     .get(function (req, res) {
//         console.log("get all revents");
        
//     })
//     .post(function (req, res) {
//         console.log("update event");
        
//     });
module.exports = router;