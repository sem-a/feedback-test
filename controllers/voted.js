/**
 * @route /api/vote
 * @method POST
 * @desc проголосовать
 * @access Public
 */
const vote = async (req, res) => {};

/**
 * @route /api/vote/cancle
 * @method POST
 * @desc отменить голос
 * @access Public
 */
const cancle = async (req, res) => {};

/**
 * @route /api/vote/get
 * @method GET
 * @desc получить голоса или по пользователя или по предложению
 * @access Public
 */
const get = async (req, res) => {};

/**
 * @route /api/vote/count
 * @method GET
 * @desc получить количество проголосовавших за предложение
 * @access Public
 */
const count = async (req, res) => {};

module.exports = {
  vote,
  cancle,
  get,
  count,
};
