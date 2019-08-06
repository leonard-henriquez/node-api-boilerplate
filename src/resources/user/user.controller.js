const User = require('./user.model')

const list = async (req, res, next) => {
  try {
    // Find all users
    const users = await User.find({})

    // Return results
    res.status(200).json({ users })
  } catch (error) {
    next(error)
  }
}

const create = async (req, res, next) => {
  try {
    // Create user
    const user = await User.create(req.body)

    // Return result
    res.status(200).json({ user })
  } catch (error) {
    next(error)
  }
}

const get = async (req, res, next) => {
  try {
    // Find user
    const user = await User.findOne({ _id: req.params.id })

    // Return user
    res.status(200).json({ user })
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    // Find and update user
    const result = await User.updateOne({ _id: req.params.id }, req.body)

    // Return result
    res.status(200).json({ result })
  } catch (error) {
    next(error)
  }
}

const remove = async (req, res, next) => {
  try {
    // Find and remove user
    const result = await User.deleteOne({ _id: req.params.id })

    // Return result
    res.status(200).json({ result })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  list,
  create,
  get,
  update,
  remove,
}
