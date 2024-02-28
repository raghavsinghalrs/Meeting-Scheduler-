const Meet = require('../models/meeting');

const get_homepage = async (req, res) => {
    try {
        const full_Data = await Meet.findAll();
        res.status(200).json({ full_Data });
    } catch (error) {
        console.error("Error occurred while counting rows:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const deleterow = async (req, res) => {
    try {
        const id = req.params.id
        console.log(id);
        await Meet.destroy({ where: { id: id } });
        res.status(200).json("Deleted successfully")
    } catch (err) {
        console.log(err);
    }
}

const databyTime = async (req, res) => {
    try {
        const data_2PM = await Meet.findAll({ where: { time: '2:00 PM' } });
        const data_2_30PM = await Meet.findAll({ where: { time: '2:30 PM' } });
        const data_3PM = await Meet.findAll({ where: { time: '3:00 PM' } });
        const data_4PM = await Meet.findAll({ where: { time: '4:00 PM' } });

        const responseData = {};

        if (data_2PM.length > 0) {
            responseData.data_2PM = data_2PM;
        }
        if (data_2_30PM.length > 0) {
            responseData.data_2_30PM = data_2_30PM;
        }
        if (data_3PM.length > 0) {
            responseData.data_3PM = data_3PM;
        }
        if (data_4PM.length > 0) {
            responseData.data_4PM = data_4PM;
        }

        res.json(responseData);
    } catch (err) {
        res.status(500).json({ err });
    }
};

const form_Data = async (req, res) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const time = req.body.time;
        const count = req.body.count;
        console.log(name);
        const data = await Meet.create({name: name, email: email, time: time, count: count});
        res.status(201).json({newrowdetails: data});
    }catch(err){
        console.log(err);
    }
}

module.exports = {
    get_homepage,
    deleterow,
    databyTime,
    form_Data
};


