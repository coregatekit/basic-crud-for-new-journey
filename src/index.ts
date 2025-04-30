import expresss, { type Request, type Response } from "express";
import { AppDataSource } from "./data-source";
import { positionRouter } from "./routes/position.route";
import bodyParser from "body-parser";
import morgan from "morgan";
import { personRouter } from './routes/person.route';
import { employeeRouter } from './routes/employee.route';

const PORT = 8000;

const app = expresss();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("combined"));

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "The API is working perfectly!✅" });
});
app.use("/positions", positionRouter);
app.use("/persons", personRouter);
app.use("/employees", employeeRouter);

AppDataSource.initialize()
  .then(async () => {
    app.listen(PORT, () =>
      console.log(`Application is starting on port: ${PORT} 🚀`)
    );
    console.log("Database connection has been established successfully! ✅");
  })
  .catch((error) => {
    console.error("Error during Data Source initialization", error);
  });
