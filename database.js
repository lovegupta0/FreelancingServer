const mongoose=require("mongoose");
mongoose.connect("mongodb+srv://lovegupta0:lovegupta0@cluster0.f1okn.mongodb.net/freelance",{
  useNewUrlParser:true,
  useUnifiedTopology: true
});

const appliedSchema=new mongoose.Schema({
  email:String,
  project_name:String,
  bid:String,
  select:String,
  paid:String
});

const applied= new mongoose.model("applied",appliedSchema);

const createProjectSchema= new mongoose.Schema({
  email:String,
  name:String,
  type:String,
  language:String,
  instruction:String,
  date:String,
  cost:String,
  payment:String,
  select:String,
  file:String,
  applied:[appliedSchema]
});

const createProject=new mongoose.model("project",createProjectSchema);

const clientProfileSchema=new mongoose.Schema({
  fullname:String,
  email:String,
  mobile:String,
  password:String,
  dob:String,
  project:[createProjectSchema]
});
const clientProfile =new mongoose.model("client",clientProfileSchema);

exports.uploadClientProfile=(body,res)=>{
    var new_upload=new clientProfile({
        fullname:body.fullname,
        email:body.email,
        mobile:body.mobile,
        password:body.password,
        dob:body.dob,
        project:[]
    })
    new_upload.save(function(err){
        if(err) throw err;
        else{
          console.log("successfull");
          res.send("sucess");
          
        }
      })
}

function findlogin(data){
  return new Promise((res,rej)=>{
    clientProfile.findOne({email:data.username},function(err,result){
      if(err) throw err;
      res(result);
    });
  })
}

exports.clientLogin=async (data,res)=>{
  await findlogin(data).then((val)=>{
    if(val.password===data.password){
      profileData={
        username:val.email,
        fullname:val.fullname,
        status:"sucess"
      };
      var userData=JSON.stringify(profileData);
      res.send(userData);
    }
  });
}

exports.uploadProject=(body,file,res)=>{
  var new_project=new createProject({
  email:body.email,
  name:body.name,
  type:body.type,
  language:body.language,
  instruction:body.instruction,
  date:body.data,
  cost:body.cost,
  payment:"No",
  select:"No",
  file:file,
  applied:[]
  });
  new_project.save(function(err){
    if(err) throw err;
    clientProfile.updateOne({email:body.email},{$push:{project:new_project}},function(err){
      if(err) throw err;
      else{
        res.send("sucess");
      }
    })
  })
}

exports.clientData=async (body,res)=>{
 await clientProfile.find({email:body.username}).then((val)=>{
   data={
     _id:val[0]._id,
     email:val[0].email,
     project:val[0].project
   };
   var clientdata=JSON.stringify(data);
   res.send(clientdata);
 });
}