const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("./userModel")
const Property = require("./propertyModel")

dotenv.config()

const app = express()
app.use(express.json())

const PORT =process.env.PORT || 3000


const MONGODB_URL= "mongodb+srv://MarckAliceEx:MarckAliceEx@cluster0.4on18ew.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"


mongoose.connect (MONGODB_URL)
    .then(()=>{
        console.log("MongoDb Connected...")
        app.listen(PORT, ()=>{
            console.log(`Server runing on ${PORT}`)
        })
    })

    
app.get("/", (req,res)=>{
    res.json('welcome to my server')
}) 


 app.post("/user", async (req, res)=>{

    const { name, email, role } = req.body

    if(!toNamespacedPath){
        return res.status(400).json({message: "Please enter all fields."})
    }

    const newUser = await User({ name, email, role })  

    await newUser.save()

    res.status(201).json({
        message: "Success",
        newUser
    })
 })


// Register user
app.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hashedPassword, role });
  await user.save();
  res.json({ message: 'User registered' });
});

// Login user
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET);
  res.json({ token });
});


  app.post("/property", async (req, res)=>{

    const { title, description, price, location, agentId } = req.body

    if(!toNamespacedPath){
        return res.status(400).json({message: "Please enter all fields."})
    }

    const newProperty = await Property({ title, description, price, location, agentId })  

    await newProperty.save()

    res.status(201).json({
        message: "Success",
        newUser
    })
 })


