const Users = require('../models/user.models')
const db = require('../utils/database')
const initModels = require('../models/initModels');
const Categories = require('../models/category.models');
const Posts = require('../models/post.models');
initModels();

const users = [
    { username: 'Jace', email: 'andree11@gmail.com', emailVerifed: true, password: '1234567' },
    { username: 'Jace11', email: 'jarol03@gmail.com', emailVerifed: true, password: '1234567' },
    { username: 'Andree', email: 'jace101@gmail.com', emailVerifed: true, password: '1234567' },
    { username: 'Andree11', email: 'andre575@gmail.com', emailVerifed: true, password: '1234567' },
    { username: 'Jarol', email: 'defrko5@gmail.com', emailVerifed: true, password: '1234567' },
]

const categories = [
    { name: 'Java Script' },
    { name: 'React' },
    { name: 'Node' },
    { name: 'Html' },
    { name: 'CSS' },
    { name: 'Python' },
    { name: 'Base de Datos' },
]

const posts = [
    { title: '¿Que es jsx?', description: 'No me queda claro el tema alguien me podria dar una mano', author: 1, categoryId: 2 },
    { title: 'No entiendo los hooks', description: 'No encuentro mayor información alguien me podria ayudar', author: 3, categoryId: 2 },
    { title: '¿Flex o grid?', description: 'MI Mentor me dijo que felx es cosa del pasado', author: 2, categoryId: 5 },
    { title: 'Node', description: 'Alquien me ayuda en node', author: 4, categoryId: 3 },
    { title: 'Messi o el Bicho?', description: 'Sinceramente Cristiano es el mejor jugandor de la historia', author: 1, categoryId: 6 },
]

for(i=0; i<1000; i++) {
    posts.push(
        { title: `¿pregunta sobre base de daots ${i+1}`, 
        description: 'Shalala shalala shalala', 
        author: (i % 5) +1, 
        categoryId: 7 }
    )
}

db.sync({ force: true })
    .then(async () => {
        users.forEach((user) => {
            Users.create(user)
        })
        setTimeout(async () => {
            const cat = await Categories.bulkCreate(categories);
            if (cat) console.log('categorias creadas correctamente')
            const post = await Posts.bulkCreate(posts)
            if (post) console.log('Posts creados correctamente')
        }, 400)
    })