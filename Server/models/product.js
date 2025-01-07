import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    brand:{
        type: String,
        required: true,
    },
    categories: {
        type: String,
        required: true,
    },
    colors:{
        title: String,
    },
    price:{
        type: Number,
    },
    type:{
        type: String
    },
    description:{
        type: String
    },
    images:[{
        public_id:String,
        url:String,
    }],
},{
    timestamps: true,
});



const Product = mongoose.model("Product", productSchema);
export default Product;