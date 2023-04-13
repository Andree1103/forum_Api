const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const db = require("./utils/database");
const initModels = require("./models/initModels");
const userRoute = require("./routes/user.routes");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const postRoute = require("./routes/post.routes");
const answerRoute = require("./routes/anwers.routes");
const authRoute = require("./routes/auth.routes");
const catRoute = require("./routes/categories.routes");
const errorHandlerRouter = require("./routes/errorHandler.routes");
const transporter = require("./utils/mailer");
const Posts = require("./models/post.models");
initModels();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
const PORT = 8000;

db.authenticate()
  .then(() => {
    console.log("Base de datos Conectada");
  })
  .catch((error) => console.log(error));

db.sync({ force: false })
  .then(() => {
    console.log("BD conectada");
  })
  .catch((error) => console.log(error));

app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(userRoute);
app.use(postRoute);
app.use(answerRoute);
app.use(catRoute);
app.use(authRoute);
app.get("/", (req, res) => {
  res.send("Welcome to my API");
});

errorHandlerRouter(app);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en lepuerto ${PORT}`);
});
