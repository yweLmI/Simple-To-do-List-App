const mongoose = require("mongoose");
//connection to db
const initDBConnect = () => {
    
    mongoose.connect(process.env.DB_CONNECT,
         { useNewUrlParser: true }, () => {
            console.log("Connected to db!");
   
    });
}

module.exports = initDBConnect;