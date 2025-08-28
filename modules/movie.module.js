// schema

import { model, Schema } from "mongoose";

const schema=new Schema({
    title:String,
    description:String
})


const movie =model('Movie',schema)
export default movie
