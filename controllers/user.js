const { prisma } = require("../prisma/prisma-client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * @route POST /api/user/login
 * @desc Авторизация пользователя
 * @access Public
 */

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Пожалуйста, заполните все обязательные поля!" });
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    const isPasswordCorrect =
      user && (await bcrypt.compare(password, user.password));

    const secret = process.env.JWT_SECRET;

    if (user && isPasswordCorrect) {
      return res.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email,
        token: jwt.sign({ id: user.id }, secret, { expiresIn: "30d" }),
      });
    } else {
      return res
        .status(400)
        .json({ message: "Неверно введен логин или пароль!" });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Возникла непредвиденная ошибка на сервере!" });
  }
};

/**
 * @route POST /api/user/reg
 * @desc регистрация пользователя
 * @access Public
 */

const reg = async (req, res) => {
  const { name, email, password, avatar } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Пожалуйста, заполните обязательные поля!" });
  }

  try {
    const registerUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (registerUser) {
      return res
        .status(400)
        .json({ message: "Пользователь с таким E-mail уже зарегистрирован" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        avatar,
      },
    });

    const secret = process.env.JWT_SECRET;

    if (user && secret) {
      return res.status(201).json({
        id: user.id,
        email: user.email,
        name: user.name,
        token: jwt.sign({ id: user.id }, secret, { expiresIn: "30d" }),
      });
    } else {
      return res
        .status(500)
        .json({ message: "Не удалось создать пользователя!" });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Возникла непредвиденная ошибка на сервере!" });
  }
};

/**
 * @route GET /api/user/current
 * @desc Текущий пользователь
 * @access Protected
 */
const current = async (req, res) => {
  return res.status(200).json(req.user);
};

module.exports = {
  reg,
  current,
  login,
};
