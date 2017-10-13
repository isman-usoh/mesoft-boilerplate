import { Sequelize } from "sequelize-typescript";
import { Topic } from "./models/Topic";

const sequelize = new Sequelize({
    "username": "root",
    "password": "123456789",
    "database": "meschool_development",
    "host": "127.0.0.1",
    "dialect": "mysql",
});

sequelize.addModels([Topic]);
sequelize
    .sync()
    .then(() => {
        const topic = new Topic();
        topic.title = "Isman";
        topic.description = "my description";
        return topic.save();
    });
