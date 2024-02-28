const express = require("express");

const router = express.Router();

const meetingcontroller = require('../controllers/meeting');

router.get('/home_page',meetingcontroller.get_homepage);
router.delete('/delete_row/:id',meetingcontroller.deleterow);
router.get('/databyTime',meetingcontroller.databyTime);
router.post('/form_data',meetingcontroller.form_Data);


module.exports = router;

