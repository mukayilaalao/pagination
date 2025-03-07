const express = require("express");
import router from "./routes";
require("dotenv").config();
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(router);

app.listen(port, ()=> console.log(`Server listening on port ${port} ...`));

