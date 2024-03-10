const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
class Auth {
  static async generateToken(id) {
    return jwt.sign({ id }, "abc123", {
      expiresIn: "30d",
    });
  }
  static async verifyToken(payload) {
    try {
      const token = payload.split(" ")[1].trim();
      const decoded = jwt.verify(token, "abc123");
      return decoded;
    } catch (error) {
      console.error("Token Verification Error:", error.message);
      throw error; // Rethrow the error to be handled elsewhere
    }
  }
  static async genrateHashPassword(payload) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(payload, salt);
  }
  static async verifyHashPassword(payload) {
    return bcrypt.compare(payload.data, payload.hash);
  }
}
export default Auth;
