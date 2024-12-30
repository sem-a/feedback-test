const { prisma } = require("../prisma/prisma-client");

/**
 * @route /api/vote
 * @method POST
 * @desc проголосовать
 * @access Public
 */
const vote = async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: "Неверно заполнены поля запроса!" });
  }

  try {
    const proposal = await prisma.proposal.findFirst({
      where: {
        id,
      },
    });

    if (!proposal) {
      return res
        .status(404)
        .json({ message: "Такого предложения не найдено!" });
    }

    const voted = await prisma.voted.findFirst({
      where: {
        proposal_id: id,
        user_id: req.user.id,
      },
    });

    if (voted) {
      return res
        .status(400)
        .json({ message: "Вы уже голосовали за это предложение!" });
    }

    const newVoted = await prisma.voted.create({
      data: {
        proposal_id: id,
        user_id: req.user.id,
      },
    });

    return res.status(201).json(newVoted);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Возникла непредвиденная ошибка на сервере!" });
  }
};

/**
 * @route /api/vote/cancle
 * @method POST
 * @desc отменить голос
 * @access Public
 */
const cancle = async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: "Неверно заполнены поля запроса!" });
  }

  try {
    const cancle = await prisma.voted.findFirst({
      where: {
        proposal_id: id,
        user_id: req.user.id,
      },
    });

    if (!cancle) {
      return res.status(400).json({ message: "Такого голоса не найдено!" });
    }

    const cancleDelete = await prisma.voted.delete({
      where: {
        proposal_id: id,
        user_id: req.user.id,
      },
    });

    return res.status(201).json(cancleDelete);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Возникла непредвиденная ошибка на сервере!" });
  }
};

/**
 * @route /api/vote/get
 * @method GET
 * @desc получить голоса или по пользователя или по предложению
 * @access Public
 */
const get = async (req, res) => {
  const { user_id, proposal_id } = req.query;

  const where = {};

  if (!user_id && !proposal_id) {
    return res.status(400).json({ message: "Неверно заполнены поля запроса!" });
  }

  if (user_id) {
    where.user_id = user_id;
  }
  if (proposal_id) {
    where.proposal_id = proposal_id;
  }

  try {
    const get = await prisma.voted.findMany({
      where,
    });

    return res.status(200).json(get);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Возникла непредвиденная ошибка на сервере!" });
  }
};

/**
 * @route /api/vote/count
 * @method GET
 * @desc получить количество проголосовавших за предложение
 * @access Public
 */
const count = async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: "Неверно заполнены поля запроса!" });
  }

  try {
    const count = await prisma.voted.count({
      where: {
        proposal_id: id,
      },
    });
    return res.status(200).json(count);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Возникла непредвиденная ошибка на сервере!" });
  }
};

module.exports = {
  vote,
  cancle,
  get,
  count,
};
