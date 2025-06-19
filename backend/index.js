const express = require("express");
const cors = require('cors');
const app = express();
const PORT = 3001;
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// import routes
const routes = require("./routes/cards");

app.use(express.json());
app.use(cors());
app.use("/boards/:boardId", routes)

app.get("/boards", async (req, res) => {
    const { category, title } = req.query;
    const categoryMap = {
        celebration: "Celebration",
        "thank-you": "Thank You",
        inspiration: "Inspiration",
    };

    const findOptions = {
        where: {},
    };

    if (categoryMap[category]) {
        findOptions.where.category = categoryMap[category];
    }

    if (title) {
        findOptions.where.title = {
            contains: title,
            mode: "insensitive",
        };
    }

    if (category === "recent") {
        findOptions.orderBy = { createdAt: "desc" };
        findOptions.take = 6;
    }

    const boards = await prisma.board.findMany(findOptions);
    res.json(boards);
});


app.delete("/boards/:boardId", async (req, res) => {
    const { boardId } = req.params;
    const deletedBoard = await prisma.board.delete({
        where: { id: parseInt(boardId) }
    })
    res.json(deletedBoard);
})

app.post("/boards", async (req, res) => {
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