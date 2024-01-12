import mongoose from 'mongoose'

const taskSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    taskName: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required:true,
    }
    ,
    message: {
        type:String
    }
    
})

const model = mongoose.model("task", taskSchema)

export default model