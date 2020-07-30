//api 폴더 밑에 모든 폴더 밑의 모든 graphql파일과 
//js 파일을 schema.js에서 받아옴

import path from "path";
import { makeExecutableSchema } from "graphql-tools";
import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas"

// API 폴더 밑에는 resolver가 아닌 js파일을 두면 안됨
// --> resolver나 graphql인 파일만 넣음
const allTypes = fileLoader(path.join(__dirname, "/api/**/*.graphql"));
const allResolvers = fileLoader(path.join(__dirname, "/api/**/*.js"));

const schema = makeExecutableSchema({
    typeDefs: mergeTypes(allTypes),
    resolvers: mergeResolvers(allResolvers)
});

export default schema;