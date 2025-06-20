const express = require("express");
const router = express.Router({ mergeParams: true });
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
    const cardId = parseInt(req.params.cardId);
    const comments = await prisma.comment.findMany({
        where: { cardId },
        orderBy: { createdAt: "asc" }
    });
    res.json(comments);
});

router.post("/", async (req, res) => {
    const cardId = parseInt(req.params.cardId);
    const { message, author } = req.body;

    const newComment = await prisma.comment.create({
        data: {
            cardId,
            message,
            author
        }
    });
    res.json(newComment);
});

module.exports = router;