const mongoose=require("mongoose");

const chatSchema=new mongoose.Schema({
    sender:String,
    reciver:String,
    message:String,
    seen:false
})

exports.chat=new mongoose.model("chat",chatSchema);

const connectionSchema=new mongoose.Schema({
    sub_email:String,
    chat:[chatSchema]
})
exports.connection=new mongoose.model("connection",connectionSchema);

const chatRoomSchema= new mongoose.Schema({
    main_email:String,
    connection:[connectionSchema]
});

exports.chatRoom=new mongoose.model("chatroom",chatRoomSchema);