import "reflect-metadata";
import {createConnection} from "typeorm";
import {Bookmark} from "./entity/Bookmark";
// docker run -dti -e POSTGRES_USER=<username> -e POSTGRES_PASSWORD=<password> -p 5432:5432 --name=postgres postgres
createConnection().then(async connection => {

    console.log("Inserting a new user into the database...");
    const user = new Bookmark();
    user.name = "Timber";
    // user.lastName = "Saw";
    // user.age = 25;
    await connection.manager.save(user);
    console.log("Saved a new user with id: " + user.id);

    console.log("Loading users from the database...");
    const users = await connection.manager.find(Bookmark);
    console.log("Loaded users: ", users);

    console.log("Here you can setup and run express/koa/any other framework.");

}).catch(error => console.log(error));
