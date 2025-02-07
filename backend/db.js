const mongoose = require('mongoose');
let dbPass = "pure786mongo"
let mongoURL = `mongodb+srv://rohitmauryaeh:${dbPass}@myfood.jlpws.mongodb.net/myfood?retryWrites=true&w=majority&appName=myfood`

let mongoConnect = async ()=>{
    
    try {
        await mongoose.connect(mongoURL)
        console.log("Connected to mongo");

        let fetchedData = mongoose.connection.db.collection("food_data")
        let fetchCategory = mongoose.connection.db.collection("food_category")
        let data = await fetchedData.find({}).toArray()
        let catData = await fetchCategory.find({}).toArray()

        global.foodItem = data
        global.foodCategory = catData
            
       
        
        
    } catch (error) {
        console.error('Connection failed:', error);
    }

}


module.exports = mongoConnect
