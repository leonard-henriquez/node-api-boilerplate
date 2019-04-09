const list = ({ User }) => async (req, res, next) => {
  try {
    const users = await User.find({})
    // throw new Error("BROKEN");
    res.status(200).json({ users })
  } catch (error) {
    next(error)
  }
}

module.exports = list
