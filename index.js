const express = require("express")

const mongoose = require("mongoose")

const app = express()

app.use(express.json())

const connect = function()
{
     return mongoose.connect("mongodb://localhost:27017/bank")
}

// *******************************USERS*****************************
const userschema = new mongoose.Schema(
    {
        "firstname" : {type : String , required : true},
        "middlename" : String,
        "lastname" : {type : String , required : true},
        "age" : {type : Number , required : true},
        "email" : {type : String , required : true},
        "address" : {type : String , required : true},
        "gender" : String,
        "type" : String,    
        "masterid" : {type : mongoose.Schema.Types.ObjectId , ref : "master" , required : true}
    },
    {
        timestamps : true,
    }
)

const user = mongoose.model("user",userschema)

// *******************************BRANCH*****************************
const branchdetails = new mongoose.Schema(
    {
        "name" : {type : String , required : true},
        "address" : {type : String , required : true},
        "IFSC" : {type : String , required : true},
        "MICR" : {type : Number , required : true},
    },
    {
        timestamps : true,
    }
)

const branchdeatil = mongoose.model("branchdetail",branchdetails)

// *******************************MASTER*****************************

const masterschema = new mongoose.Schema(
    {
        "balance" : {type : Number , required : true},
        "branchid" : {type : mongoose.Schema.Types.ObjectId , ref : "branchdetail" , required : true}
    },
    {
        timestamps : true,
    }    
)

const master = mongoose.model("master",masterschema)

// *******************************SAVINGS*****************************

const savingschema = new mongoose.Schema(
    {
        "accountnumber" : {type : Number , required : true , unique : true},
        "balance" : {type : Number , required : true},
        "interest" : {type : Number , required : true},
    },
    {
        timestamps : true,
    }
)

const saving = mongoose.model("saving",savingschema)

// *******************************FIXED*****************************

const fixedschema = new mongoose.Schema(
    {
        "accountnumber" : {type : Number , required : true , unique : true},
        "balance" : {type : Number , required : true},
        "interest" : {type : Number , required : true},
        "startdate" : {type : String , required : true},
        "maturitydate" : {type : String , required : true},
    },
    {
        timestamps : true,
    }
)

const fixed = mongoose.model("fixed",fixedschema)

// ************************master****************************

app.get("/master", async function(req , res)
{
    const user = await master.find().lean().exec()
    return res.send(user)
})

app.post("/master" , async function(req , res)
{
    const user = await master.create(req.body)

    res.send(user)
})

// *******************************branch*****************************

app.get("/branch", async function(req , res)
{
    const user = await branchdeatil.find().populate({path : branchid}).lean().exec()
    return res.send(user)
})

app.post("/branch" , async function(req , res)
{
    const user = await branchdeatil.create(req.body)

    res.send(user)
})

// *******************************savings*****************************
app.get("/savings", async function(req , res)
{
    const user = await saving.find().lean().exec()
    return res.send(user)
})

app.post("/savings" , async function(req , res)
{
    const users = await saving.create(req.body)

    res.send(users)
})

// ********************************Fixed***********************
app.get("/fixed", async function(req , res)
{
    const user = await fixed.find().lean().exec()
    return res.send(user)
})

app.post("/fixed" , async function(req , res)
{
    const users = await fixed.create(req.body)

    res.send(users)
})

app.get("/master/:id" , async function(req, res)
{
    const user = await master.findById(req.params.id)

    return res.send()
})

app.listen(4000,async function()
{
    await connect()
    console.log("Listening on server 4000")
})