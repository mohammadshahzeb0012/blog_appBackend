const jwt = require("jsonwebtoken")

const iaAuth = (req, res, next) => {
  const key = process.env.SECRET_KEY
  const token = req.headers["authorization"]?.slice(8);
  if (!token) {
    return res.status(401).json({
      message: "unauthorised access"
    })
  }
  
  jwt.verify(token, key, (error, user) => {

    if (error) {
      return res.status(403).json({
        message: error.message
      })
    }
    req.user = user
    return next()
  })

}

module.exports = iaAuth