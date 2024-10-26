
const removeToken=async (req, res) => {
    try {
      res
        .clearCookie('token', {
          maxAge: 0,
          secure: process.env.NODE_ENV === 'production',
          sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        })
        .send({ success: true })
      console.log('Logout successful')
    } catch (err) {
      res.status(500).send(err)
    }
  }
  module.exports=removeToken;