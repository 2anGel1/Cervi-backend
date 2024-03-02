import entrepriseRoute from "./routes/entreprise.route";
import candidatRoute from "./routes/candidate.route";
const cookieParser = require('cookie-parser');
import authRoute from "./routes/auth.route";
import userRoute from "./routes/user.route";
const session = require("express-session");
import { Session } from "express-session";
import express from "express";
const cors = require("cors");
import ms from "ms";

const swaggerDocument = require('../swagger-docs.json');
const swaggerUi = require('swagger-ui-express');

declare module "express" {
  interface Request {
    session: Session & { [key: string]: any };
  }
}

const app = express();
app.use(cookieParser());
const basePath = "/api/v1";
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: ms("1y"),
    },
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(basePath + "/entreprise", entrepriseRoute);
app.use(basePath + "/candidat", candidatRoute);
app.use(basePath + "/auth", authRoute);
app.use(basePath + "/user", userRoute);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export { app };
