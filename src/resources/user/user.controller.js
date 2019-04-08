import User from './user.model'

export const list = async (req, res, next) => {
  try {
    // Find all users
    const users = await User.find({})

    // Return results
    res.status(200).json({ users })
  } catch (error) {
    next(error)
  }
}

export const create = async (req, res, next) => {
  try {
    // Create local user
    const user = new User(req.body)

    // Save local user to db
    await user.save()

    // Return result
    res.status(200).json({ user })
  } catch (error) {
    next(error)
  }
}

export const get = async (req, res, next) => {
  try {
    // Find user
    const user = await User.findOne({ _id: req.params.id })

    // Return user
    res.status(200).json({ user })
  } catch (error) {
    next(error)
  }
}

export const update = async (req, res, next) => {
  try {
    // Find and update user
    const result = await User.updateOne({ _id: req.params.id }, req.body)

    // Return result
    res.status(200).json({ result })
  } catch (error) {
    next(error)
  }
}

export const remove = async (req, res, next) => {
  try {
    // Find and remove user
    const result = await User.deleteOne({ _id: req.params.id })

    // Return result
    res.status(200).json({ result })
  } catch (error) {
    next(error)
  }
}
