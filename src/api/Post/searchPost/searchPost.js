import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    searchPost: async (_, args) =>
      prisma.posts({
        where: {
          OR: [
              //starts_with 대신에 contains해도 같음 ( 차이를 알아볼것! )
            { location_starts_with: args.term },
            { caption_starts_with: args.term }
          ]
        }
      })
  }
};
