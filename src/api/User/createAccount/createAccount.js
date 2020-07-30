import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        createAccount: async (_, args) => {
            // = ""를 처리해줌으로써 null값이 들어오는것을 방지한다. (필수로 작성하는것이 아니기 때문에..)
            const { name, email, firstName = "", lastName = "", bio = "" } = args;
            const exists = await prisma.$exists.user({
                OR: [
                    {
                        name
                    },
                    {
                        email
                    }
                ]
            });
            if (exists) {
                throw Error("This name / email is already taken");
            }
            await prisma.createUser({
                name,
                email,
                firstName,
                lastName,
                bio
            });
            return true;
        }
    }
};