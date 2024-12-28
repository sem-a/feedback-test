/**
 * @route GET /api/
 * @desc Добавить в портфолио
 * @access Public
 */

const index = (req, res) => {
    return res.status(200).json({message: 'Это API работает'})
}

module.exports = {
    index
}