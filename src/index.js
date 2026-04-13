import express from 'express';
import { matchRouter } from './routes/matches.js';
 

const app = express();
const port = 3000;

app.use(express.json());

 
app.use('/matches', matchRouter); 

 

app.listen(port,()=>{
    console.log(`server run at port ${port}`);
})