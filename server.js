import express  from "express";
import path from 'path'

const app = express();
const PORT = 3000;

app.use(express.static(path.join("dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join("./dist/index.html"));
});

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));


