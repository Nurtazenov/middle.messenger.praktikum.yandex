import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.static(path.join("dist")));

app.get("*", (req, res) => {
<<<<<<< HEAD
  res.sendFile(path.join("./dist/index.html"));
=======
  console.log(path.join(__dirname, "./dist/index.html"));
  res.sendFile(path.join(__dirname, "./dist/index.html"));
>>>>>>> sprint_3
});

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));

<<<<<<< HEAD

=======
>>>>>>> sprint_3
