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
var projectData;

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

app.post("/api/developerSignup",(req,res)=>{
  mdb.createDeveloperProfile(req.body,res);
});
app.post("/api/developerLogin",(req,res)=>{
  mdb.developerLogin(req.body,res);
})

app.get("/api/projectData",(req,res)=>{
  mdb.projectData(res);
})

app.post("/api/appliedData",(req,res)=>{
  mdb.appliedData(req.body,res);
});

app.post("/api/apply",(req,res)=>{
  mdb.apply(req.body,res);
})


app.post("/api/uploadProjectData",upload.single("file"),(req,res)=>{
  
  if(req.file){
    projectData=req.file.path.split("public")[1];
    res.send("sucess");
    
  }
  else{
    if(projectData){
      mdb.uploadDataProject(req.body,projectData,res);
      projectData="";
    }
    else{
      res.send("fail");
    }
    
  }
})
app.post("/api/selectDeveloper",(req,res)=>{
  mdb.select(req.body,res);
})

app.post("/api/fileandpayment",(req,res)=>{
    mdb.payment(req.body,res);
  });
app.post("/api/getFile",(req,res)=>{
  mdb.getFile(req.body,res);
})

app.post("/api/chatpeople",(req,res)=>{
  mdb.chatPeople(req.body,res);
})

app.post("/api/getchat",(req,res)=>{
  mdb.getChat(req.body,res);
})

app.post("/api/sendmessage",(req,res)=>{
  mdb.submitmessage(req.body,res);
});

app.post("/api/report",(req,res)=>{
  mdb.report(req.body);
  res.send("200");
})

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3500;
}

app.listen(port,function(){
    console.log("server started on port "+port+".........");
});