const mongoose = require("mongoose")
exports.ROLES=["user","admin"]
const role = new mongoose.Schema(
    {
        name:String,
    },
    {versionKey:false,
    }
);
module.exports = mongoose.model("role",role);