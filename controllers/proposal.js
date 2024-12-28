const { prisma } = require("../prisma/prisma-client");

/**
 * @route /api/proposal/
 * @method GET
 * @desc получить
 * @access Public
 */
const proposal = async (req, res) => {

  const {user_id, id} = req.params;

  if(!user_id && proposal_id) {
    const proposal = await prisma.proposal.findMany({
      where: {
        proposal_id
      }
    })
  }

  try {
    const proposal = await prisma.proposal.findMany()

    if(!proposal) {
      return res.status(400).json({message: 'Предложений не найдено!'})
    }

    return res.status(200).json(proposal)

  } catch(err) {
    console.log(err)
    return res.status(500).json({message: 'Возникла непредвиденная ошибка на сервере!'})
  }
};

/**
 * @route /api/proposal/create
 * @method POST
 * @desc создать предложение
 * @access Public
 */
const proposalCreate = async (req, res) => {
  try {

  } catch(err) {
    console.log(err)
    return res.status(500).json({message: 'Возникла непредвиденная ошибка на сервере!'})
  }
};

/**
 * @route /api/proposal/delete
 * @method POST
 * @desc удалить предложение
 * @access Public
 */
const proposalDelete = async (req, res) => {
  try {

  } catch(err) {
    console.log(err)
    return res.status(500).json({message: 'Возникла непредвиденная ошибка на сервере!'})
  }
};

module.exports = {
  proposal,
  proposalForId,
  proposalForAuthor,
  proposalCreate,
  proposalDelete,
};
