const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
require("dotenv").config();

const usersRouter = require("./routes/api/users");
const contactsRouter = require("./routes/api/contacts");

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const upload = multer({ dest: path.join(__dirname, "tmp") });

app.patch("/users/avatars", upload.single("avatar"), (req, res) => {
  // Обработка загруженного файла и сохранение в папку public/avatars
  // Генерация уникального имени файла для конкретного пользователя
  // Обновление поля avatarURL пользователя с новым URL

  res.json({ avatarURL: "тут будет ссылка на изображение" });
});

app.use("/users", usersRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
