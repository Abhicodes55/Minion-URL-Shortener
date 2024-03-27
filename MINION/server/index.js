const express = require("express");
const app = express();
const port = 3200;
const cors = require('cors')
require("dotenv").config();
const connectDatabase = require('./config/dbConnection');
const urlShortnerRouter = require('./Routes/urlRoutes');
const useragent = require('express-useragent');
app.use(express.json());
app.use(useragent.express());
app.set('trust proxy', false);

connectDatabase()
app.use(cors())


app.use('/', urlShortnerRouter)
console.log("DB_URI:", process.env.DB_URI);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});