const express=require('express');
const cors=require('cors');
require('dotenv').config();
const mongoose=require('mongoose');

const uri=process.env.DB_URL;
const app=express();
const port=process.env.PORT||8080;

app.use(cors());
app.use(express.json());
mongoose.connect(uri,{useNewUrlParser:true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

const Todo=require('./models/todo');

app.get('/todos',async(req,res)=>{
    const todos = await Todo.find();

    res.json(todos);
});

app.post('/todos/new',(req,res)=>{
    const todo=new Todo({
        text:req.body.text
    });
    todo.save();

    res.json(todo);
});

app.get('/todos/complete/:id',async (req,res)=>{
    const todo = await Todo.findById(req.params.id);
    todo.complete =!todo.complete;
    todo.save();
    res.json();
})

app.delete('/todos/delete/:id',async (req,res)=>{
    const result = await Todo.findByIdAndDelete(req.params.id);

    res.json(result);
})

app.listen(port,()=>{
    console.log(`Server is running:${port}`);
});