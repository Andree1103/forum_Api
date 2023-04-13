const AuthServices = require("../services/auth.service");
const UsersService = require("../services/user.service");
const transporter = require("../utils/mailer");

const createUser = async (req, res, next) => {
  try {
    const newUser = req.body;
    const result = await UsersService.create(newUser);

    res.status(201).send();
    const { id, email, username } = result;
    const token = await AuthServices.getToken({
      id,
      email,
      username,
    });
    console.log(token);
    await transporter.sendMail({
      from: "andreechiquis11@gmail.com",
      to: result.email,
      subject: "Verifica tu correo electronico",
      html: `
                <p>Hola ${result.username} Bienvenido al foro</p>
                <p>Es necesario que verifiques tu correo</p>
                <a href="http://127.0.0.1:5173/verify?token=${token}" target="_blank">Validar Correo</a>
                `,
    });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, lastname } = req.body;
    await UsersService.update(id, { name, lastname });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  updateUser,
};
