import datasquirel from "datasquirel";

import { DSQL_POST_QUERY_OBJECT, DSQL_RESPONSE } from "../../app";

export type DbHandlerParams = {
    method: "GET" | "POST";
    query?: DSQL_POST_QUERY_OBJECT | string;
    queryValues?: any[];
};

export default async function dbHandler({ method, query, queryValues }: DbHandlerParams): Promise<DSQL_RESPONSE | null> {
    let result: DSQL_RESPONSE | null = null;

    const parsedMethod = method.toUpperCase();

    switch (parsedMethod) {
        case "GET":
            result = await datasquirel.get({
                db: process.env.DATASQUIREL_DB_NAME || "",
                key: process.env.DATASQUIREL_READ_ONLY_API_KEY || "",
                query: typeof query === "string" ? query : "",
                queryValues,
            });
            break;

        case "POST":
            result = await datasquirel.post({
                database: process.env.DATASQUIREL_DB_NAME || "",
                key: process.env.DATASQUIREL_FULL_ACCESS_API_KEY || "",
                query: query as DSQL_POST_QUERY_OBJECT,
                queryValues,
            });
            break;

        default:
            break;
    }

    return result;
}
