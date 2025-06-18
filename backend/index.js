const express = require("express");
const cors = require('cors');
const app = express();
const PORT = 3001;
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// import routes
const routes = require("./routes/boards");

app.use(express.json());
app.use(cors());
app.use("/boards", routes);

app.get("/", async (req, res) => {
    const boards = await prisma.board.findMany();
    res.json(boards);
})

app.delete("/:boardId", async (req, res) => {
    const { boardId } = req.params;
    const deletedBoard = await prisma.board.delete({
        where: { id: parseInt(boardId) }
    })
    res.json(deletedBoard);
})

app.post("/", async (req, res) => {
    const { title, category, imageUrl, author, createdAt } = req.body;
    const newBoard = await prisma.board.create({
        data: {
            title,
            category,
            imageUrl,
            author,
            createdAt
        }
    });
    res.json(newBoard);
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})