import mongoose from 'mongoose';

const connectDatabase = async () => {
    try{
        await mongoose.connect("mongodb://localhost/my_database",{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    console.log("database is successfully connected..");
    } catch (err) {
        console.log(err.message)
    }
};

export default connectDatabase;