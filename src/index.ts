import expresss, { type Request, type Response } from "express";
import { AppDataSource } from "./data-source";

const PORT = 8000;

const app = expresss();
app.use(expresss.json());

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "The API is working perfectly!✅" });
});

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
