import fs from "node:fs/promises";
import CustomError from "../types/error-type.ts";
import path from "node:path";
import { tryReadOrCreateFile } from "../util/file.ts";

const filePath = path.join(process.cwd(), "data", "users.json"); // ./data/users.json

class User {
  id?: string;
  nickname: string;
  email: string;
  password: string;

  constructor({
    nickname,
    email,
    password,
  }: {
    nickname: string;
    email: string;
    password: string;
  }) {
    this.nickname = nickname;
    this.email = email;
    this.password = password;
  }

  static async findOne({
    id,
    nickname,
    email,
  }: {
    id?: string;
    nickname?: string;
    email?: string;
  }) {
    try {
      const fileContent = await tryReadOrCreateFile({ filePath });
      const usersData = JSON.parse(fileContent) as User[];
      const fetchedUser =
        usersData.find(
          (u) => u.id === id || u.nickname === nickname || u.email === email
        ) || null;
      return fetchedUser;
    } catch (error) {
      console.log(error);
      throw new CustomError("An error occured, couldn't fetch user.", 500);
    }
  }

  async save() {
    try {
      this.id = new Date().toISOString();
      const fileContent = await tryReadOrCreateFile({ filePath });
      const usersData = JSON.parse(fileContent) as User[];
      usersData.push(this);
      await fs.writeFile(filePath, JSON.stringify(usersData, null, 2));
      return this;
    } catch (error) {
      console.log(error);
      throw new CustomError("An error occured, couldn't save user.", 500);
    }
  }
}

export default User;
