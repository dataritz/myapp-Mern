const jwt = require('jsonwebtoken');

const generateAccessToken = (user)=> {
  const payload = {
    email: user.Email
  };
  
  const secret = 'I Like ABESIT';
  const options = { expiresIn: 180 };

  return jwt.sign(payload, secret, options);
}


const verifyAccessToken = (token)=> {
  const secret = 'I Like ABESIT';

  try {
    const decoded = jwt.verify(token, secret);
    return true
  } catch (error) {
    return false
  }
}


module.exports = {generateAccessToken,verifyAccessToken}
