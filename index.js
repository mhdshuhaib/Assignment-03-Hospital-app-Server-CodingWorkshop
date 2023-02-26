const { json } = require("express");
const express = require("express");
const app = express();
const fs = require("fs");
const data = require('./hospiteldata.json');
app.use(express.json());

//get 
app.get('/hospitel',(req,res)=>{
    res.send(data);
});

//post
app.post('/hospitel',(req,res)=>{
    data.push(req.body);
fs.writeFile('hospiteldata.json',JSON.stringify(data),(err,resp)=>{
    if(err){
        res.send("data doesnot added");
    }else{
        res.send("data is added");
    }
});
});

//put
app.put('/hospitel/:name',(req,res)=>{
    let value= req.params.name;
    data.forEach((item)=>{
        if(item.name==value){
        item.patientcount=req.body.patientcount;
        item.hospitellocatoin=req.body.hospitellocatoin;
    }
})
fs.writeFile('hospiteldata.json',JSON.stringify(data),(err,resp)=>{
    if(err){
        res.send("data doesnot added");
    }else{
        res.send("data is added");
    }
})
 

});

//delete
app.delete('/hospitel/:name',(req,res)=>{
    let value=req.params.name;
   let result= data.filter((item=> item.name != value))

   fs.writeFile('hospiteldata.json',JSON.stringify(result),(err,resp)=>{
    if(err){
        res.send("data not deleted");
    }else{
        res.send("data is deleted");
    }
   })


});



//listen
app.listen(3004);