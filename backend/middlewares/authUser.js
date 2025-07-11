import jwt from 'jsonwebtoken'

// User authentication middleware
const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.status(401).json({ success: false, message: 'Not Authorized, Login Again' });
    }

    // Decode JWT
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    //  Fix: Ensure req.body is always an object
    if (!req.body) req.body = {};

    // Add user ID to the request body
    req.body.userId = token_decode.id;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ success: false, message: 'Token Invalid or Expired' });
  }
};

export default authUser;
