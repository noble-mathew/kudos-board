const express = require("express");
const router = express.Router({ mergeParams: true });
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
    const boardId = parseInt(req.params.boardId);
    const cards = await prisma.card.findMany({
        where: { boardId },
    });
    res.json(cards);
});

router.post("/", async (req, res) => {
    const boardId = parseInt(req.params.boardId);
    const { title, description, imageUrl, owner } = req.body;

    const newCard = await prisma.card.create({
        data: { boardId, title, description, imageUrl, owner },
    });
    res.status(201).json(newCard);
});

router.put("/:cardId", async (req, res) => {
    const cardId = parseInt(req.params.cardId);
    const { votes } = req.body;  

    const updated = await prisma.card.update({
        where: { id: cardId },
        data: { votes },   
    });
    res.json(updated);
});

router.delete("/:cardId", async (req, res) => {
    const cardId = parseInt(req.params.cardId);
    const deleted = await prisma.card.delete({
        where: { id: cardId },
    });
    res.json(deleted);
});


module.exports = router 