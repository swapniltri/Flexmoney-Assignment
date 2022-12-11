const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        username:{
            type: String
        },
        password:{
            type: String
        },
        age:{
            type: Number
        },
        batch1:{
            type: Number,
        },
        batch2:{
            type: Number,
        },
        amount:{
            type: Number
        }
    }
);

const User = mongoose.model('user',UserSchema);

module.exports = User;