const mongoose=require("mongoose");
mongoose.connect("mongodb+srv://lovegupta0:lovegupta0@cluster0.f1okn.mongodb.net/freelance",{
  useNewUrlParser:true,
  useUnifiedTopology: true
});

const message=require("./chat");

const appliedSchema=new mongoose.Schema({
  project_id:String,
  dev_email:String,
  client_email:String,
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

const developerProfileSchema=new mongoose.Schema({
  fullname:String,
  email:String,
  mobile:String,
  password:String,
  dob:String,
  applied:[appliedSchema]
})

const developerProfile=new mongoose.model("developer",developerProfileSchema);

const uploadProjectDataSchema=new mongoose.Schema({
  project_id:String,
  file:String
});

const uploadProjectData=new mongoose.model("projectData",uploadProjectDataSchema);

exports.uploadClientProfile=(body,res)=>{
    var new_upload=new clientProfile({
        fullname:body.fullname,
        email:body.email,
        mobile:body.mobile,
        password:body.password,
        dob:body.dob,
        project:[]
    })
    var main=new message.chatRoom({
      main_email:body.email,
      connection:[]
    })
    main.save();
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


exports.createDeveloperProfile=(body,res)=>{
  var new_profile=new developerProfile({
    fullname:body.fullname,
    email:body.email,
    mobile:body.mobile,
    password:body.password,
    dob:body.dob,
    applied:[]
  })
  var main=new message.chatRoom({
    main_email:body.email,
    connection:[]
  })
  main.save();
  new_profile.save((err)=>{
    if (err) throw err;
    console.log("sucessfull");
    res.send("OK");
  })
}

function login(data){
  return new Promise((res,rej)=>{
   developerProfile.findOne({email:data.username},function(err,result){
      if(err) throw err;
      res(result);
    });
  })
}

exports.developerLogin= async (data,res)=>{
  await login(data).then((val)=>{
    if(val.password===data.password){
      profileData={
        username:val.email,
        fullname:val.fullname,
        status:"sucess"
      };
      var userData=JSON.stringify(profileData);
      res.send(userData);
    }
    else{
      var userData=JSON.stringify({status:"fail"});
      res.send(userData);
    }
  });
}

exports.projectData=(res)=>{
  createProject.find((err,result)=>{
    if(err) throw err;
    res.send(JSON.stringify(result));
  })
}

exports.appliedData=(body,res)=>{
  developerProfile.findOne({email:body.username},(err,result)=>{
    if(err) throw err;
    var data=result.applied;
    res.send(JSON.stringify(data));
  });
}

exports.apply=(body,res)=>{
  var new_apply=new applied({
    project_id:body.project_id,
    dev_email:body.dev_email,
    client_email:body.client_email,
    project_name:body.project_name,
    bid:body.bid,
    select:"No",
    paid:"No"
  })
  developerProfile.updateOne({email:body.dev_email},{$push:{applied:new_apply}},function(err){
    if(err) throw err;
    else{
      console.log("sucesss");
    }
  });
  createProject.updateOne({_id:body.project_id},{$push:{applied:new_apply}},function(err){
    if(err) throw err;
    else{
      res.send("sucess");
    }
  });
  clientProfile.updateOne({
    email:body.client_email,
    project:{$elemMatch:{_id:body.project_id}}
  },{$push:{"project.$.applied":new_apply}}, function (error, success){
    if(error)console.log(error);
    else{
      console.log(success);
    }
  });
}

exports.uploadDataProject=(body,file,res)=>{
  uploadProjectData.findOne({project_id:body.id},(err,result)=>{
    if(err) throw err;
   if(result){
     uploadProjectData.updateOne({project_id:body.id},{file:file},(err)=>{
       if(err) throw err;
       else{
         res.send("sucess");
       }
     })
   }
   else{
     var new_data=new uploadProjectData({
       project_id:body.id,
       file:file
     })
     new_data.save();
     res.send("sucess");
   }
  });
}
exports.select=(body,res)=>{
  createProject.updateOne({_id:body.project_id},{select:body.select,cost:body.cost},function(err,result){
    if(err) throw err;
  })

  var new_sub1=new message.connection({
    sub_email:body.name,
    chat:[]
  })
  var new_sub2=new message.connection({
    sub_email:body.email,
    chat:[]
  })

 
  message.chatRoom.updateOne({
    main_email:body.name
  },{$push:{connection:new_sub2}}, function (error, success){
    if(error)console.log(error);
    else{
      
    }
  });

  message.chatRoom.updateOne({
    main_email:body.email
  },{$push:{connection:new_sub1}}, function (error, success){
    if(error)console.log(error);
    else{
      
    }
  });

  createProject.updateOne({
    _id:body.project_id,
    applied:{$elemMatch:{_id:body.applied_id}}
  },{
    $set:{"applied.$.select":body.select}
  }, function (error, success){
    if(error)console.log(error);
    else{
      
    }
  });
  clientProfile.updateOne({
    email:body.email,
    project:{$elemMatch:{_id:body.project_id}}
  },{
    $set:{
      "project.$.select":body.select,
      "project.$.cost":body.cost
    }
  }, function (error, success){
    if(error)console.log(error);
    else{
      
    }
  });
  clientProfile.updateOne({
    email:body.email,
    project:{$elemMatch:{
      _id:body.project_id,
      applied:{
        $elemMatch:{
          _id:body.applied_id,
          dev_email:body.name
        }
      }
    }}
  },{
    $set:{
      "project.$[].applied.$.select":body.select
    }
  }, function (error, success){
    if(error)console.log(error);
    else{
      console.log(success);
    }
  })
  
  developerProfile.updateOne(
    {
      email:body.name,
      applied:{
        $elemMatch:{
          _id:body.applied_id,
        }
      }
    },{
      $set:{
        "applied.$.select":body.select
      }
    }, function (error, success){
      if(error)console.log(error);
      else{
        
      }
    }
  )
}

exports.payment=(body,res)=>{
  createProject.updateOne({_id:body.project_id},
    {payment:body.payment},function(err,result){
    if(err) throw err;
  });
  createProject.updateOne({
    _id:body.project_id,
    applied:{$elemMatch:{_id:body.applied_id}}
  },{
    $set:{"applied.$.paid":body.payment}
  }, function (error, success){
    if(error)console.log(error);
  });
  clientProfile.updateOne({
    email:body.email,
    project:{$elemMatch:{_id:body.project_id}}
  },{
    $set:{
      "project.$.payment":body.payment
    }
  }, function (error, success){
    if(error)console.log(error);
  });
  clientProfile.updateOne({
    email:body.email,
    project:{$elemMatch:{
      _id:body.project_id,
      applied:{
        $elemMatch:{_id:body.applied_id}
      }
    }}
  },{
    $set:{
      "project.$[].applied.$.paid":body.payment
    }
  }, function (error, success){
    if(error)console.log(error);
    else{
      console.log(success);
    }
  });
  developerProfile.updateOne(
    {
      email:body.name,
      applied:{
        $elemMatch:{
          _id:body.applied_id
        }
      }
    },{
      $set:{
        "applied.$.paid":body.payment
      }
    }, function (error, success){
      if(error)console.log(error);
    }
  );

  uploadProjectData.findOne({project_id:body.project_id},function(err,result){
    if(err) throw err;
    res.send(JSON.stringify(result));
  });
}

exports.getFile=(body,res)=>{
  uploadProjectData.findOne({project_id:body.project_id},function(err,result){
    if(err) throw err;
    res.send(JSON.stringify(result));
  });
}

exports.submitmessage=(body,res)=>{
 var new_message=new  message.chat({
  sender:1,
  reciver:0,
  message:body.message,
  seen:false
 });
 var new_mess=new  message.chat({
  sender:0,
  reciver:1,
  message:body.message,
  seen:false
 });
 message.chatRoom.updateOne({
   main_email:body.sender,
   connection:{
    $elemMatch:{
      sub_email:body.reciever
    }
   }
 },{$push:{"sub_email.$.chat":new_message}}, 
 function (error, success){
  if(error)console.log(error);
  else{
    console.log(success);
  }
}
 )

 message.chatRoom.updateOne({
  main_email:body.reciever,
  connection:{
   $elemMatch:{
     sub_email:body.sender
   }
  }
},{$push:{"sub_email.$.chat":new_mess}}, 
function (error, success){
 if(error)console.log(error);
 else{
   console.log(success);
 }
}
)

}

exports.chatPeople=(body,res)=>{
  message.chatRoom.findOne({main_email:body.username},function(err,result){
    if(err) throw err;
    res.send(JSON.stringify(result));
  })
}

exports.getChat=(body,res)=>{
  message.chatRoom.findOne({
    main_email:body.username,
    connection:{$elemMatch:{
      sub_email:body.sub
    }}
  
  },function(err,result){
    if(err) throw err;
    var data;
    for(var i=0;i<result.connection.length;i++){
      if(result.connection[i].sub_email===body.sub){
        data=result.connection[i];
        break;
      }
    }
    res.send(JSON.stringify(data.chat.reverse()));
   
  })
}


exports.report=(body)=>{
  var new_sub1=new message.connection({
    sub_email:"admin@admin.com",
    chat:[]
  })
  var new_sub2=new message.connection({
    sub_email:body.email,
    chat:[]
  })

  message.chatRoom.updateOne({
    main_email:"admin@admin.com"
  },{$push:{connection:new_sub2}}, function (error, success){
    if(error)console.log(error);
    else{
      
    }
  });

  message.chatRoom.updateOne({
    main_email:body.email
  },{$push:{connection:new_sub1}}, function (error, success){
    if(error)console.log(error);
    else{
      
    }
  });
}