import path, { join } from "path";

import express from "express";

const app = express();

const PORT = 3000;

app.use(express.static(path.resolve(process.cwd(), "dist")));

app.get("*", (req, res) => {
  const indexPath = join(path.resolve(process.cwd(), "dist"), "index.html");
  res.sendFile(indexPath);
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
