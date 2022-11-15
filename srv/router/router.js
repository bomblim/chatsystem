import express from 'express';
var router = express.Router();
import path from 'path';
const __dirname = path.resolve();

// GET method route
router.get('/', function (req, res) {
    res.sendFile( __dirname + '/webapp/index.html');
});
  

export default router;