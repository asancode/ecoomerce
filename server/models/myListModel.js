import mongoose from "mongoose";
const myListSchema = mongoose.Schema({
    productTitle:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        default:0
    },
    price:{
        type:Number,
        required:true
    },
    productId:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    catName:{
        type:String,
        required:true
    },
      variation: {
          type: mongoose.Schema.Types.Mixed, // ✅ Object bhi store hoga
          default: {},
        },

},{
    timestamps:true
})
const MyListModel = mongoose.model('mylist',myListSchema)
export default MyListModel