const express = require('express');
const router = express.Router();

const Ninja = require('../models/ninja');


router.get('/ninjas', (req, res, next) => {
   var lat = parseFloat(req.query.lat);
   var lng = parseFloat(req.query.lng);
   Ninja.aggregate([
       {
           $geoNear: {
               near: { type: 'Point', coordinates: [lng, lat] },
               distanceField: 'dist.calculated',
               maxDistance: 100000000000000000,
               spherical: true
           }
       }
   ]).then((ninjas) => {
    res.send(ninjas);
   }).catch(next);
});

router.post('/ninjas', (req, res, next) => {    
   var ninja = new Ninja(req.body);
   ninja.save().then((ninja) => {
    res.send(ninja)
   }).catch(next);
});

router.put('/ninjas/:id', (req, res, next) => {
    var id = req.params.id;
    Ninja.findByIdAndUpdate(id, req.body, {new: true}).then((ninja) => {        
        res.send(ninja);
    }).catch((next));
});

router.delete('/ninjas/:id', (req, res, next) => {
    var id = req.params.id;
    Ninja.findByIdAndDelete({
        _id: id
    }).then((ninja) => {
        if(!ninja) {
            return res.status(404).send();
        }
        res.send(ninja);
    }).catch(next);
});

module.exports = router;