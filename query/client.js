import { GraphQLClient } from 'graphql-request';
import dotenv from 'dotenv';

dotenv.config();

const graphql = new GraphQLClient(
    process.env.GRAPHCMS_URL,
    {
        headers: {
            authorization: process.env.GRAPHCMS_TOKEN,
        },
    }
);

export const graphqlMutate = new GraphQLClient(
    process.env.GRAPHCMS_UPDATE_URL,
    {
        headers: {
            authorization: process.env.GRAPHCMS_TOKEN,
        },
    }
);


export default graphql;