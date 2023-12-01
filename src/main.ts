import express from "express";
import dotenv from "dotenv";
dotenv.config();
import stdRouter from "./routes/student";
import path from "path";



const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/std", stdRouter);


app.get("/", (req, res)=> {
    res.sendFile(path.join(__dirname, "../index.html"));
});

app.post("/welcome.html", (req, res)=> {
    console.log(req.query);
    console.log(req.body);
    
    res.sendFile(path.join(__dirname, "../welcome.html"));
});

// Create a web server

const main = async () => {
    try {
        await app.listen(port);
        console.log("Listening on port " + port);
    }catch(err){ 
        console.log("Failed to listen on port");
    }
};

main();