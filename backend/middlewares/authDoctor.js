import jwt from 'jsonwebtoken'

// doctor authentication middleware
const authDoctor = async (req, res, next) => {
  try {
    const { dtoken } = req.headers;

    if (!dtoken) {
      return res.status(401).json({ success: false, message: 'Not Authorized, Login Again' });
    }

    // Decode JWT
    const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET);

    //  Fix: Ensure req.body is always an object
    if (!req.body) req.body = {};

    // Add user ID to the request body
    req.body.docId = token_decode.id;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ success: false, message: 'Token Invalid or Expired' });
  }
};

export default authDoctor;
