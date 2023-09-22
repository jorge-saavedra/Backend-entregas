import express from "express";
// import { ProductManager } from "./src/ProductManager.js";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import __dirname from "./src/utils.js";
import viewsRouter from "./src/routes/views.router.js";
import productRouter from "./src/routes/products.routes.js";
import path from "path";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const httpServer = app.listen(8080, () => {
  console.log("Listen on PORT 8080");
});

const socketServer = new Server(httpServer);

app.engine("handlebars", handlebars.engine());

app.set("views", path.join(__dirname, "views"));

app.set("view engine", "handlebars");

app.use(express.static(path.join(__dirname, "public")));
app.use("/", viewsRouter);
app.use("/api/products", productRouter);

socketServer.on("connection", (socket) => {
  console.log("New Client connect");

  socket.on("message", (data) => {
    console.log(data);
  });
});
