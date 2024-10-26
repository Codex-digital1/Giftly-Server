const jwt = require('jsonwebtoken')
const verifyAdmin = async (req, res, next) => {
    console.log('hello')
    const user = req.user
    const query = { email: user?.email }
    const result = await usersCollection.findOne(query)
    console.log(result?.role)
    if (!result || result?.role !== 'admin')
      return res.status(401).send({ message: 'unauthorized access!!' })

    next()
  }
module.exports=verifyAdmin;