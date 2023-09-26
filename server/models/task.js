import mongoose from "mongoose";

const taskSchema = new  mongoose.Schema({
    title: {
        type: String,
        required: true,      
    }
})