// src/routes/index.js
'use strict';

const router = require('express').Router();
const mongoose = require('mongoose');

// Workshop Create Read Update Delete
// ----------------------------------

// Create a workshop. Only accessible to the teacher.
router.post('/workshop', function(req, res, next) {
    console.log("post /api/workshop");
    const Workshop = mongoose.model('Workshop');
    const workshopData = {
        title: req.body.title,
        date: req.body.date,
        location: req.body.location,
        duration: req.body.duration,
        description: req.body.description,
        maxparticipants: req.body.maxparticipants,
        what: req.body.what,
        status: req.body.status
    };
    console.log("title", workshopData.title, "date", workshopData.date);
    
    Workshop.create(workshopData, function(err, newWorkshop) {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }
  
      res.json(newWorkshop);
    });
});

// Read about a workshop. Any body is allowed to do so.
router.get('/workshop' , function(req, res, next) {
    console.log("get /api/workshop");
    mongoose.model('Workshop').find({}, function(err, workshops) {
//        console.log("title", workshops.title, "date", workshops.date);
        res.json(workshops);
    });
});


// Update a workshop. Only accessible to the teacher.
router.put('/workshop/:workshopId', function(req, res, next) {
    const Workshop = mongoose.model('Workshop');
    const workshopId = req.params.workshopId;
    console.log("put /api/workshop " + workshopId);
    
    Workshop.findById(workshopId, function(err, workshop) {
        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }
        if (!workshop) {
            return res.status(404).json({message: "Workshop not found"});
        }
  
        workshop.title = req.body.title;
        workshop.description = req.body.description;
        workshop.date = req.body.date;
        workshop.location = req.body.location;
        workshop.duration = req.body.duration;
        workshop.maxparticipants = req.body.maxparticipants;
        workshop.what = req.body.what;

        var today = new Date();
        if (workshop.date < today) {
            console.log("Old workshop: forcing status closed");
            workshop.status = "closed";
        }
        workshop.save(function(err, savedWorkshop) {
            res.json(savedWorkshop);
        })
    })
});


router.delete('/workshop/:workshopId', function(req, res, next) {
    const Workshop = mongoose.model('Workshop');
    const workshopId = req.params.workshopId;
    console.log("delete /api/workshop " + workshopId);
    Workshop.findByIdAndRemove(workshopId, function(err, workshop) {
        if (err) {
            console.log(err);
            return res.status(500).json({ err: err.message });
        }
        if (!workshop) {
            return res.status(404).json({message: "Workshop not found"});
        }
        res.json({ message: 'Workshop Deleted' });
    });
});

module.exports = router;
