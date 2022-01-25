const axios= require("axios")

exports.changePosition=async ()=>{
await axios.post("http://localhost:3200/position/610c7fa459942b0d30da3526",{}).then((response)=>{console.log(response)})}