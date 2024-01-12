import taskModel from '../models/taskM.js'
import { checkToken } from '../utils/checkAuth.js'
import { createError } from '../utils/error.js'


export const taskCreate = async (req, res, next) => {
    try {
        const newTask = taskModel({
            ...req.body,
            user_id: req.user.id,
        })
        await newTask.save()
        res.status(200).json({success:true,message:'Task Created'})
    } catch (err) {
        next(createError(400, err.message))
    }
}

export const updateTask = async(req,res,next)=>{
    try{
        const todo = await taskModel.findById(req.params.id)

        if (todo.user_id !== req.user.id) {
            return next(createError(400,'You are not autherized'))
        }
        const update= await taskModel.findByIdAndUpdate(req.params.id,{
            $set:{
               ...req.body
            }
        },{new:true})
        res.status(200).json({success:true,message:''})
    }catch(err)
    { 
        next(createError(400,err.message))
    }
}

// export const statusInprocess = async (req, res, next) => {
//     try {
//         const inprogressStatus = await taskModel.findByIdAndUpdate(req.params.value,
//             {
//                 $set: {
//                     status: {
//                         incomplete: true,
//                         inprogress: true
//                     }
//                 }
//             },
//         {new:true}
//         )
//         console.log(inprogressStatus)
//         res.status(200).json('status updated')
        
//     } catch (err) {
//         next(createError(400, err.message))
//     }
// }

// export const statusCompleted = async (req, res, next) => {
//     try {
//         const completedStatus = taskModel.findByIdAndUpdate(req.params.value,
//         {
//             $set: {
//                 status: {
//                     completed: true,
//                     inprogress: false,
//                     incomplete: false
//                 }
//             }
//         })
        
//         res.status(200).json('status updated')
        
//     } catch (err) {
//         next(createError(400, err.message))
//     }
// }

export const getTask = async (req, res, next) => {
    try {
        const taskGet = await taskModel.find({user_id:req?.user?.id})
        res.status(200).json({success:true,data:taskGet})
    } catch (err) {
        next(createError(400, err.message))
    }
}