const { prisma } = require("../prisma/prisma-client");

/**
 * @route /api/proposal/
 * @method GET
 * @desc получить
 * @access Public
 */
const proposal = async (req, res) => {
  const { user_id, id } = req.query;

  const where = {};

  if (user_id) {
    where.user_id = user_id;
  }
  if (id) {
    where.id = id;
  }

  console.log(where);

  try {
    const proposal = await prisma.proposal.findMany({
      where: where,
    });

    return res.status(200).json(proposal);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Возникла непредвиденная ошибка на сервере!" });
  }
};

/**
 * @route /api/proposal/create
 * @method POST
 * @desc создать предложение
 * @access Public
 */
const proposalCreate = async (req, res) => {
  const { title, text } = req.body;

  if (!title || !text) {
    return res
      .status(400)
      .json({ message: "Пожалуйста, заполните все обязательные поля!" });
  }

  try {
    const proposal = await prisma.proposal.create({
      data: {
        title,
        text,
        user_id: req.user.id,
      },
    });

    return res.status(201).json(proposal);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Возникла непредвиденная ошибка на сервере!" });
  }
};

/**
 * @route /api/proposal/delete
 * @method POST
 * @desc удалить предложение
 * @access Public
 */
const proposalDelete = async (req, res) => {
  const { id } = req.query;

  if(!id) {
    return res.status(400).json({ message: "Неверно заполнены поля запроса!" });
  }

  try {
    const proposal = await prisma.proposal.delete({
      where: {
        id,
      },
    });

    return res.status(201).json(proposal);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Возникла непредвиденная ошибка на сервере!" });
  }
};

module.exports = {
  proposal,
  proposalCreate,
  proposalDelete,
};
