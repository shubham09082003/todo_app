const express = require('express')
const app = express();
const {createTodo , updateTodo} = require('./type')
const cors = require('cors')
const {Todo} = require('./db')
app.use(cors());
app.use(express.json());


// body {
// title:Sting
//description:String
//}

app.post('/todo', async function(req,res){
    const createPayload = req.body;
    const parsePayload = createTodo.safeParse(createPayload);
    if(!parsePayload.success){
        res.status(411).json({
            msg: "You Sent Wromng Information"
        })
        return;
    }
    
    await Todo.create({
        title: createPayload.title,
        description: createPayload.description,
        completed: false
    })

    res.json({
        msg: "tdod created"
    })

})

app.get('/todos', async function(req,res){
    const response = await Todo.find({})
    if(response){
        res.json({
            response:response
        })
    }
    else{
        res.json({
            msg: "There is no todos"
        })
    }

})

app.put("/completed",async function(req,res){
    const createPayload = req.body;
    const parsePayload = updateTodo.safeParse(createPayload)
    if(!parsePayload.success){
        res.status(411).json({
            msg: "You Sent Wrong Id"
        })
        return;
    }

    await Todo.update({
        _id: req.body.id
    },{
        completed:true
    })

    res.json({
        msg:"Todo is completed"
    })

})


const port = 3000
app.listen(port, console.log(`server is listening on port ${port}`)
)
