const UsersService = require("../services/user.service");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const AuthServices = require("../services/auth.service");

const userLogin = async (req, res,next) => {
    try {
        const {email, password} = req.body;
        const user = await UsersService.getUser(email);
        if (!user) {
            return next({
                status: 400,
                message: 'Invalid email',
                error: 'User not found'
            })
        } 
        if (!user.emailVerifed) {
            return next ({
                status: 400,
                message: "User email is not verified",
                error: "Email verification"
            })
        }
        const isValid = await bcrypt.compare(password, user.password)
        if (!isValid) {
            return next({
                status: 400,
                message: 'The password doesnt match with email user',
                error: 'Invalid pasword'
            })
        }
        const {
            id,
            name,
            lastname,
            username,
        } = user;
        const token = AuthServices.getToken({id,name,lastname,username})
        res.json({
            id,name,lastname,username,email,token
        });
    } catch (error) {
        next(error)
    }
}


const verifyEmail = async (req,res,next) => {
    try {
        const {token} = req.body;
        console.log(token)
        //* Decodificar token y verificas
        const userData = await jwt.verify(token,'jace', {
            algorithms: 'HS512',
        });

        const user = UsersService.getUser(userData.email); 
        if(user.emailVerifed) {
            return next({
                status: 400,
                message: 'User is already verified',
                errorName: 'Failed to verify email'
            })
        }
        await UsersService.update(userData.id, {
            emailVerifed: true
        });
        res.status(204).send();


    } catch (error) {
        next({
            status:400,
            message: 'Invalid or expired token',
            errorName: error
        })
    }
}

module.exports = {
    userLogin,
    verifyEmail
}