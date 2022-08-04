//router
//need to require child process to use exec
const express = require('express');
const containerRouter = express.Router();
const path = require('path');
const containerController = require('../controllers/containerController');

containerRouter.get(
  '/',
  //console.log('We are at the container router'),
  //containerController.middlewareCheck,
  // console.log(typeof containerController.startSocat),
  containerController.startSocat,
  containerController.checkSocat,
  containerController.getContainers,
  (req, res) => {
    return res.status(200).json(res.locals.containers);
    // return res.status(200).json([{ id: '1212' }]);

    // console.log(res.locals.containers);
  }
);

module.exports = containerRouter;