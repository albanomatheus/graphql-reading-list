const express = require("express");
const graphqlIHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");

mongoose.connect("mongodb://localhost/bookstore", { useNewUrlParser: true });

mongoose.connection
	.once("open", () => {
		console.log("[MONGODB] => Connection has been made!");
	})
	.on("error", error => {
		console.log("[MONGODB] => Connection error: ", error);
	});

const app = express();

app.use(cors());
app.use("/graphql", graphqlIHTTP({ schema, graphiql: true }));

app.listen(4000, () => {
	console.log("Listening on port 4000");
});
