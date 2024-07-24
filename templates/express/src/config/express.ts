import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import compress from "compression";
import bodyParser from "body-parser";

import { corsOptions } from "src/utils/corsOptions";
import router from "src/routes/v1/index";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const portNumber = process.env.PORT;
app.use(express.json());

app.use(cookieParser());

app.use(compress());

app.use(helmet());

app.use(cors(corsOptions));

app.listen(portNumber, () => console.info(`listening to port http://localhost:${portNumber}`));

app.get("/", (req: Request, res: Response) => {
  res.send("Server is up and running");
});

app.use("/api", router);
