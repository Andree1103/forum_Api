const { check, validationResult, param } = require("express-validator");
const validateResult = require("../utils/validate");

const createUserValidator = [
  check("username", "Error con el campo username")
    .exists()
    .withMessage("El username debe existir")
    .notEmpty()
    .withMessage("El username no debe estar vacio")
    .isString()
    .withMessage("El username debe ser un String")
    .isLength({ min: 6 })
    .withMessage("El username debe tener una longitud mínima de 6 caracters"),
  check("email", "Error con el campo email")
    .exists()
    .withMessage("El email debe existir")
    .notEmpty()
    .withMessage("No se encontro un valor para el email")
    .isString()
    .isLength({ min: 10, max: 100 })
    .withMessage("El correo debe tener una longitud entre 10 y 100")
    .isEmail()
    .withMessage("El correo no tiene un formato correcto"),
  check("password", "Error con la contraseña")
    .exists()
    .notEmpty()
    .isString()
    .isLength({ min: 7 }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const updateUserValidator = [
  param("id").isInt().withMessage("El id debe ser un numero entero"),
  check("name")
    .isString()
    .exists()
    .withMessage("No se encuentra el nombre para el usuario")
    .notEmpty()
    .withMessage("EL nombre no debe ser un string vacio"),
  check("lastname")
    .isString()
    .exists()
    .withMessage("No se encuentra el nombre para el usuario")
    .notEmpty()
    .withMessage("EL nombre no debe ser un string vacio"),
  // check("email", "El correo no se puede cambiar").not().exists(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = {
  createUserValidator,
  updateUserValidator,
};
