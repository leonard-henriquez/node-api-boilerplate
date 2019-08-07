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
    await User.create(req.body)
    const user = await User.findOne({ email: req.body.email })

    // Return result
    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}

const get = async (req, res, next) => {
  try {
    // Find user
    const user = await User.findOne({ _id: req.params.id })

    // Return user
    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    // Find and update user
    await User.updateOne({ _id: req.params.id }, req.body)
    const user = await User.findOne({ _id: req.params.id })

    // Return result
    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}

const remove = async (req, res, next) => {
  try {
    // Find and remove user
    await User.deleteOne({ _id: req.params.id })

    // Return result
    res.status(200).json({ status: true })
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
