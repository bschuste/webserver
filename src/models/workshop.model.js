// src/models/workshop.model.js
// database model structure for workshops
'use strict';

const mongoose = require('mongoose');

const WorkshopSchema = new mongoose.Schema({
    title: String,                               // name of the workshop
    date: { type: Date, default: Date.now },     // date and time of when the workshop happens
    location: String,                            // where does the workshop happen
    duration: Number,                            // how long
    description: String,                         // brief description of what it is for
    maxparticipants: Number,                     // maximum number of participants
    what: String,                                // which equipemnt to bring and how to come dressed
    status: {type: String, default: "open"}      // workshop status: open, partially filled, full, closed
  }, {
    timestamps: true                             // mongoose automatically adds createdAt and updatedAt fields.
  });
  
  const Workshop = mongoose.model('Workshop', WorkshopSchema);
  //Make the model available to other components of the server app.
  module.exports = Workshop;
  
  
  Workshop.count({}, function(err, count) {
    if (err) {
      throw err;
    }
  
    // No need to seed the workshop list if some already exists
    if (count > 0) return ;
  
    const workshopSeed = require('./workshop.seed.json');
    Workshop.create(workshopSeed, function(err, newWorkshop) {
      if (err) {
        throw err;
      }
      console.log("DB workshop seeded")
    });
  });
