import "reflect-metadata";
import {createConnection, Connection} from "typeorm";
import {Bookmark} from "./entity/Bookmark";
// docker run -dti -e POSTGRES_USER=<username> -e POSTGRES_PASSWORD=<password> -p 5432:5432 --name=postgres postgres

export const connection = async () => {
    return await createConnection({
        type: "postgres",
        host: "localhost",
        port: 1,
        username: 'a',
        password: '',
        database: '',
        entities: [Bookmark]
    });
}
