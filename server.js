const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const { readdirSync } = require("fs");
const dotenv = require("dotenv");

dotenv.config();
app.use(express.json());
app.use(cors());

// routes
readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));

// database
mongoose
	.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
	.then(() => console.log("Database Connected Successfully!"))
	.catch((err) => console.log("Database connection error"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server is listening on ${PORT}`);
});
