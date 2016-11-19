const express = require('express');
const router = express.Router();
var sphero = require('sphero');
var orb = sphero('/dev/tty.Sphero-PRO-RN-SPP');
// var orb2 = sphero('/dev/tty.Sphero-ORR-RN-SPP');

orb.connect(function() {
  orb.color('green');
  // orb2.color('red');
});

router.get('/:color', function (req, res, next) {
  var newColor = req.params.color;
  orb.color(newColor);
});

router.get('/:speed/:direction/:time', function(req, res, next) {
  var speed = req.params.speed;
  var direction = req.params.direction;
  var time = req.params.time;

  setInterval(function() {
    orb.roll(speed, direction);
  }, time);

  setInterval(function() {
    orb2.roll((speed-50), direction);
    res.status(200).send('success');
  }, time);
});

orb.setPowerNotification(1, function (err, data) {
  console.log(err | 'data: ' + data);
});

orb2.setPowerNotification(1, function (err, data) {
  console.log(err | 'data: ' + data);
});

module.exports = router;
