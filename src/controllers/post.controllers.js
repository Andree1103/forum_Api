const PostsServices = require('../services/post.service')

const getAllPosts = async (req,res,next) => {
    try {
        const {categoryId, offset, limit} = req.query;
        const posts = await PostsServices.getAll(categoryId,offset,limit);
        const {count, rows} = posts;
        const url = 'localhost:8000/api/v1/posts';

        const newOffset = (isNext)=> {
            if(isNext) return Number(offset) + Number(limit);
            return Number(offset) - Number(limit)
        }

        const nextPage = Number(offset) + Number(limit) >= count ? null: `${url}?offset=${newOffset(true)}&limit=${limit}`;
        const previousPage = Number(offset) >0 ? `${url}?offset=${newOffset(false)}&limit=${limit}`:null;
        const response = {
            count,
            next: nextPage,
            previous: previousPage,
            posts: rows
        }
        res.json(!limit && !offset ? rows: response);
    } catch (error) {
        next(error);
    }
}

const getPostsWithAnswers = async(req,res,next) => {
    try {
        const {postId} = req.params;
        const postAnsawer= await PostsServices.postWithAnswer(postId);
        res.json(postAnsawer);
    } catch (error) {
        next(error);
    }
}

const createPost = async (req,res,next) => {
    try {
        const newpost = req.body;
        const post = await PostsServices.create(newpost);
        res.status(201).json(post)
    } catch (error) {
        next(error);
    }
}

const updatePost = async (req, res,next) => {
    try {
        const {id} = req.params;
        const newdata = req.body;
        await PostsServices.update(newdata, id);
        res.status(204).send()
     } catch (error) {
        next(error);
    }
}

module.exports = {
    createPost,
    getPostsWithAnswers,
    getAllPosts,
    updatePost
}