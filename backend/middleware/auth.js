import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
  const token = req.header("tokeen");
  if (!token) return res.status(401).json({ message: "Auth Error" });
  try {
    const decode = jwt.verify(token, "randomString");
    req.user = decode.user;
    next();
  } catch {
    res.status(500).send({ message: "Invalid Token" });
  }
};
