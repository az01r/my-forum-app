import fs from "node:fs/promises";
import CustomError from "../types/error-type.ts";

class User {
    id?: string;
    nickname: string;
    email: string;
    password: string;

    constructor ({ nickname, email, password }: { nickname: string, email: string, password: string }) {
        this.nickname = nickname;
        this.email = email;
        this.password = password;
    }

    static async findOne({ id, nickname, email }: { id?: string, nickname?: string, email?: string }) {
        try {
            const fileContent = (await fs.readFile("./data/users.json")).toString();
            if (!fileContent) return ;
            const usersData = JSON.parse(fileContent.toString()) as User[];
            const fetchedUser = usersData.find(u => u.id === id || u.nickname === nickname || u.email === email);
            return fetchedUser;
        } catch (error) {
            console.log(error);
            throw new CustomError("An error occured, couldn't fetch user.", 500);
        }
    }

    async save() {
        try {
            this.id = new Date().toISOString();
            const fileContent = (await fs.readFile("./data/users.json")).toString();
            let usersData: User[];
            if (fileContent) {
                usersData = JSON.parse(fileContent.toString()) as User[];
                usersData.unshift(this);
            } else {
                usersData = [this];
            }
            await fs.writeFile("./data/users.json", JSON.stringify(usersData, null, 2));
            return this;
        } catch (error) {
            console.log(error);
            throw new CustomError("An error occured, couldn't save user.", 500);
        }
    }
}

export default User;