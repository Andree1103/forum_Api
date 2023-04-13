const Anwers = require("../models/Anwers.models");

class AnswerService {
    static async create(newAnswer) {
        try {
            const result = await Anwers.create(newAnswer);
            return result;
        } catch (error) {
            throw error;
        }
    }

    static async delete(id) {
        try {
            const result = Anwers.destroy({
                where:{id}
            });
            return result;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = AnswerService;