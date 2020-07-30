import { prisma } from "../../../generated/prisma-client";

export default {
  User: {
    // parent는 root라고 불리며 fullname의 한단계위인 user의 정보를 가져옴.
    fullName: (parent) => {
      return `${parent.firstName} ${parent.lastName}`;
    },
    isFollowing: async (parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      try {
        return prisma.$exists.user({
          AND: [
            {
              id: user.id,
            },
            {
              following_some: {
                id: parentId,
              },
            },
          ],
        });
      } catch (error) {
        return false;
      }
      isSelf: (parent, _, { request }) => {
        const { user } = request;
        const { id: parentId } = parent;
        return user.id === parentId;
      };
    },
  },
};
