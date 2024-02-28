const express = require('express');
const cors = require('cors');
const app = express()

const homepageRoute = require('./routes/meeting');

const sequelize = require('./util/database');

app.use(cors());
app.use(express.json());
app.use(homepageRoute);

async function func(){
    await sequelize.sync()
    app.listen(3000,()=>console.log("Listening on port 3000"));
}
func();

