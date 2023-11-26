const express = require("express");
const app = express();
const LIMIT = 20;
const DELAY = 1000;
const PORT = 3000;

let connections = [];
app.get("/date", (req, res, next) => {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Transfer-Encoding", "chunked");
    connections.push(res);
});

let tick = 0;
setTimeout(function run(){
    let data = Date();
    console.log(data);
    ++tick;
    if(++tick > LIMIT){
        connections.map(res => {
            res.write("END\n");
            res.end();
        });
        connections = [];
        tick = 0;
    }
    connections.map((res, index) => {
        res.write(`Hello ${index}! Date: ${data}.\n`);
    });
    setTimeout(run, DELAY);
}, DELAY);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});