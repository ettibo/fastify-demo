import mongoose from "mongoose"

export const itemSchema = new mongoose.Schema({name: String})

export const ItemModel = mongoose.model("Item", itemSchema)