import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeUser: async (_, args) => {
      //isAuthenticated(request); 공개돈 profile이라 인증하지 않아도 됨.
      const { id } = args;
      const user = await prisma.user({ id });
      const posts = await prisma.user({ id }).posts();
      return {
        user,
        posts,
      };
    },
  },
};
