import mongoose from 'mongoose';

const connectDatabase = async () => {
    try{
        await mongoose.connect("mongodb+srv://alokgoldy:mYvbsZwKOq93LQG6@cluster0.qbhfk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    console.log("database is successfully connected..");
    } catch (err) {
        console.log(err.message)
    }
};

export default connectDatabase;