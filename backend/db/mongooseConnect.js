const mongoose = require('mongoose');

const connectToMongodb = async () => {
    try {

        await mongoose.connect(process.env.Mongodb_Url);
        console.log('Mongodb database Connected Successfully...')

    } catch (error) {

        console.log("Error to connect with mongodb database : ", error.message);
    }
}

module.exports = connectToMongodb;