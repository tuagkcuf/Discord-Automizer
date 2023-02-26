import mongoose from "mongoose";
const { Schema } = mongoose;

const ProfilesSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
});

export const Profiles = mongoose.model("Profiles", ProfilesSchema);
