const db = require('./database') 

db.sync({force: true}).then(() => { 
    console.log("DB synced"); 
}); 