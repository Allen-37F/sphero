const express = require('express');
const router = express.Router();
var sphero = require('sphero');
var orb = sphero('/dev/tty.Sphero-PRO-RN-SPP');
var orb2 = sphero('/dev/tty.Sphero-BBO-RN-SPP');

orb.connect(function() {
  orb.color('green');
});

orb2.connect(function() {
  orb2.color('red');
});

router.get('/', function (req, res, next) {
  res.status(200).send('success');
});

router.get('/:color/:color2', function (req, res, next) {
  var newColor = req.params.color;
  var newColor2 = req.params.color2;
  orb.color(newColor);
  orb2.color(newColor2);
  res.status(200).send('success');
});

router.get('/:speed/:direction/:time', function(req, res, next) {
  var speed = req.params.speed;
  var direction = req.params.direction;
  var time = req.params.time;

  setInterval(function() {
    orb.roll(speed, direction);
  }, time);

  // setInterval(function() {
  //   orb2.roll((speed - 50), direction);
  // }, time);
});

// orb.setPowerNotification(1, function (err, data) {
//   console.log(err | 'data: ' + data);
// });
//
// orb2.setPowerNotification(1, function (err, data) {
//   console.log(err | 'data: ' + data);
// });

module.exports = router;
