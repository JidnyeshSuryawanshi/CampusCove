const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  return res.json({ status: "Server Started" });
});

app.listen(PORT, () => console.log("Server Started"));
