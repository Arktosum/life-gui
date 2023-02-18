const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const PORT = 5000
app.use(express.json());
app.use(cors());

let mongodbURI = `mongodb+srv://siddhujaykay2:shiine1984@life-cluster.zopfx6x.mongodb.net/main?retryWrites=true&w=majority`

const financeItem = require('./models/financeItem')

mongoose.connect(mongodbURI,{
    useNewUrlParser: true
})

app.post('/api/finance/add',async (req,res)=>{
    console.log('Adding data!')
    const item = new financeItem(req.body)
    try{
        await item.save()
        res.send({success:true})
    }catch(err) {console.log(err)}
})


app.get('/api/finance/read',async (req,res)=>{
    financeItem.find({},(err,result)=>{
        if(err) res.send(err)
        res.send(result)
    })
})

app.post('/api/finance/update',async (req,res)=>{
    let id = req.body.id
    try{
        await financeItem.findOneAndUpdate({id:id},req.body)
        res.send({sucess:true})
    }
    catch(err){
        console.log(err);
    }
})
app.post('/api/finance/delete',async (req,res)=>{
    let id = req.body.id
    try{
        await financeItem.findOneAndDelete({id:id},req.body)
        res.send({sucess:true})
    }
    catch(err){
        console.log(err);
    }
})
app.listen(PORT,()=>{
    console.log(`Started Server on | http://localhost:${PORT}`);
})