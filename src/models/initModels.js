const Users = require('./user.models');
const Posts = require('./post.models');
const Categories = require('./category.models');
const Anwers = require('./Anwers.models');


const initModels = () => {

    Users.hasMany(Posts, { foreignKey: 'author' });
    Posts.belongsTo(Users, { foreignKey: 'author' });

    Categories.hasMany(Posts, { foreignKey: 'categoryId' });
    Posts.belongsTo(Categories, { foreignKey: 'categoryId' });

    Users.hasMany(Anwers, { foreignKey: "author" });
    Anwers.belongsTo(Users, { foreignKey: "author" });


    Posts.hasMany(Anwers, { foreignKey: "postId" })
    Anwers.belongsTo(Posts, { foreignKey: "postId" })
}

module.exports = initModels;