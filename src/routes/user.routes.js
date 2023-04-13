const { Router } = require('express');
const Categories = require('../models/category.models');
const Posts = require('../models/post.models');
const Users = require('../models/user.models');
const { createUser, updateUser } = require('../controllers/user.controllers');
const { createUserValidator, updateUserValidator } = require('../validators/user.validators');
const authenticate = require('../middlewares/auth.middleware');

/*router.get('/api/v1/users/:id/posts', async(req, res) => {
    try {
        const {id} = req.params;
        const userPost = await Users.findByPk(id, {
            attributes: ['username'], 
            include: {
                model:Posts,
                attributes: ['title', 'category_id'],
                include: {
                    model:Categories,
                    attributes: ['name']
                }
            }
        })
        res.json(userPost); 
    } catch (error) {
        res.status(400).json(error);
    }
});*/

const router = Router();

router.post('/api/v1/user',createUserValidator, createUser);
router.put('/api/v1/users/:id', updateUserValidator, updateUser);

module.exports = router;
