import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    email: {
        type: String,
        unique: ['true', 'Email sudah ada!'],
        required: [true,'Email belum dimasukkan :*']
    },
    username: {
    type: String,
    required: [true, 'Username is required!'],
    match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username tidak valid, username harus mengandung 8-20 alphanumeric letters dan harus unik"]
    },
    image: {
        type:String
    }
})

const User = models.User || model("User", UserSchema);

export default User