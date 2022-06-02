import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }

},
{
    timestamps: true
});

userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function(next) { 
    //we only want to do this if the password field is sent or if it's modified.
    if(!this.isModified('password')) //this funcitonality is all part of mongoose. we can check is something has been modified.
    {
        next();
    }

    const salt = await bcrypt.genSalt(6);

    this.password = await bcrypt.hash(this.password, salt); //initially the password but we're resetting it as the hashed password.
}); //we use pre. because we want this to happen before the new user gets created/stored in the db. 



const User = mongoose.model('User', userSchema);


export default User;