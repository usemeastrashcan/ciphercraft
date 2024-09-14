    import mongoose from 'mongoose'


    export const connect = async()=>
    {
        
        try {
            
            mongoose.connect(process.env.MONGO_URI!)
            const connection = mongoose.connection
            connection.on('connected', ()=>{
                console.log("MongoDB connected Successfully")
            })

            connection.on('error', (err)=>
            {
                console.log(`Error Connecting to MongoDB`, err)
            })

        } catch (error)
        {
            console.log("Couldn't connect to Database. Error: ", error)
        }
    }