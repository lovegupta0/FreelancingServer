const express=require("express");
const bodyParser=require("body-parser");
const multer=require("multer");
const path=require("path");

const mdb=require("./database");

const app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(express.static(__dirname+"/public/upload"));

var file;

var storage=multer.diskStorage({
  destination:"./public/upload/",
  filename:(req,file,cb)=>{
    cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
  }
});

var upload=multer({
  storage:storage
});

app.get("/",(req,res)=>{
    res.send("working...");
});

app.post("/api/clientSignup",(req,res)=>{
  mdb.uploadClientProfile(req.body,res);
});

app.post("/api/clientLogin",(req,res)=>{
  mdb.clientLogin(req.body,res);
});

app.post("/api/createProject",upload.single("file"),(req,res)=>{
  
  if(req.file){
    file=req.file.path.split("public")[1];
    res.send("sucess");
    
  }
  else{
    console.log(file);
    if(file){
      mdb.uploadProject(req.body,file,res);
      file='';
    }
    else{
      res.send("fail");
    }
    
  }
})

app.post("/api/clientData",(req,res)=>{
  mdb.clientData(req.body,res);
})


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3500;
}

app.listen(port,function(){
    console.log("server started on port "+port+".........");
});