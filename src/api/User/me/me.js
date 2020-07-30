import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    // __는 _와 다르며, 변수명으로 쓸수 있음.
    me: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      return await prisma.user({ id: user.id });
    },
  },
};
