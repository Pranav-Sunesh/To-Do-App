import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import { v4 as uuidv4  } from "uuid";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import db from './db.js'
configDotenv();

const PORT = process.env.PORT || 5000;
const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => res.send());

app.get("/items/:userEmail",async(req, res) => {
    try{
        const { userEmail } = req.params;
        const result = await db.query("SELECT * FROM TODO WHERE user_email=$1",[userEmail]);
        res.send(result.rows); 
         
    }catch(e){
        console.error(e);
    }
});

app.post("/submit", async(req, res) =>{
    const {data} = req.body;
    const uuid = uuidv4();
    try{
    const result = await db.query("INSERT INTO todo VALUES($1,$2,$3,$4,$5)",[uuid,data.user,data.title,data.progress,data.date]);
    res.json(result)
    }catch(err){
        console.error(err);
        res.status(400);
    }
})

app.delete("/submit/:id",async(req, res) => {
    const { id } = req.params;
    const response = await db.query("DELETE FROM todo WHERE id = $1",[id]);
    res.send(response);
})

app.patch("/submit/:id",async(req, res) => {
    const {id} = req.params;
    const {data} = req.body;
    const response = await db.query("UPDATE todo SET title=$1,progress=$2 WHERE id=$3",[data.title,data.progress,id]);
    res.json(response);
})


app.post("/signin",async(req, res) => {
    const {email, password} = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashed_password = bcrypt.hashSync(password, salt);
    try {
        const result = await db.query("INSERT INTO users VALUES($1,$2)",[email,hashed_password]);
        const token = jwt.sign({email}, 'secret', { expiresIn: '1h' });
        res.send({email, token})
    } catch (error) {
        res.send(error);
    }
});



app.post("/login", async(req, res) =>{
    const {email, password} = req.body;
    
    try{
        const result = await db.query("SELECT * FROM users WHERE user_email = $1",[email]);
        if(result.rows[0]){
            const hashed_password = result.rows[0].hashed_password;
            const ans = await bcrypt.compare(password, hashed_password);   
            if(ans){
                const token = jwt.sign({email}, 'secret' , {expiresIn: '1h'});
                res.send({email ,token});
            }else{
                res.send({error: "Incorrect Password"});
            }
        }else{
            res.send({error: "No user found!"});
        }
    }catch(error){
        console.log(error);
    }

});


app.listen(PORT,() => console.log(`The server running on port ${PORT}`));