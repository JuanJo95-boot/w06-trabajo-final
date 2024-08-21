require('../models')
const sequelize = require("../utils/connection");
const userCreate = require('./createData/userCreate');


const testMigrate = async()=>{

    try{
        await sequelize.sync({force:true})
        console.log('DB reset ✅');
        await userCreate()// Introducimos un usuario
        process.exit()
    }catch(error){
        console.error(error);
    }
}


testMigrate()