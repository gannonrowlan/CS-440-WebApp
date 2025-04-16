import bcrypt from "bcrypt";
import * as userRepo from "../data/userRepository.js";

const authService = {
  getUserByEmail: async (email) => {
    return await userRepo.getUserByEmail(email);
  },

  createUser: async (email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await userRepo.createUser(email, hashedPassword);
  },
};

export default authService;
