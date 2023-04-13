const Posts = require("../models/post.models");
const Anwers = require("../models/Anwers.models");
const Categories = require("../models/category.models");
const Users = require("../models/user.models");

class PostsServices {

    static async getAll(query, offset,limit) {
        const filter = query ?  {where :{categoryId: query}}: {};
        try {
            const result = await Posts.findAndCountAll({
                ...filter,
                offset,
                limit,
                attributes: { exclude: ['description', 'author','categoryId']},
                include: [
                    {
                        model:Users,
                        attributes: ['username']
                    },
                    {
                        model:Categories,
                        attributes: ['name']
                    }
                ]
            });
            return result;
        } catch (error) {
            throw error;
        }
    }


    static async create(newpost) {
        try {
            const result = await Posts.create(newpost);
            return result;
        } catch (error) {
            throw error;
        }
    }

    static async postWithAnswer(postId) {
        try {
            const result = await Posts.findByPk(
                postId,
                {
                    attributes: { exclude: ['categoryId', 'author'] },
                    include: [
                        {
                            model: Users,
                            attributes: ["username"]
                        },
                        {
                            model: Anwers,
                            include: {
                                model: Users,
                                attributes: ["username"]
                            }
                        },
                        {
                            model: Categories,
                            attributes: ["name"]
                        },

                    ]
                }
            );
            return result;
        } catch (error) {
            throw error;
        }
    }

    static async update(newdata, id) {
     try {
        const result = await Posts.update(newdata,{
            where:{id}
        });
        return result;
     } catch (error) {
        throw error;
     }   
    }
}

module.exports = PostsServices;