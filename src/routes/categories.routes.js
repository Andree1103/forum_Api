const {Router} = require('express');
const Categories = require('../models/category.models');
const router = Router();

router.get('/api/v1/categories', async (req,res,next) => {
    try {
        const categories = await Categories.findAll();
        res.json(categories);
    } catch (error) {
        next(error)
    }
})

module.exports = router;