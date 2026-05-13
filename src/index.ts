import express from "express";
import dotenv from "dotenv";

import authRouter from "./routes/auth/auth";
import userRouter from "./routes/user/user";
import todosRouter from "./routes/todos/todo";


dotenv.config();

const app = express();

app.use(express.json());

app.use(authRouter);
app.use(userRouter);
app.use(todosRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
