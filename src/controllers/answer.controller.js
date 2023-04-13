const AnswerService = require("../services/answer.service");

const createAnswer = async (req,res, next) => {
    try {
        const newA = req.body;
        const answer= await AnswerService.create(newA);
        res.status(201).json(answer)
    } catch (error) {
        next(error);
    }
}

const deleteAnswer = async(req,res,next) => {
    try {
        const {id} = req.params;
        await AnswerService.delete(id);
        res.status(204).send()
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createAnswer,
    deleteAnswer
}