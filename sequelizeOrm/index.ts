import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "/database/db.sqlite",
});
// test database connection
sequelize.authenticate().then(console.log, console.error);

export default sequelize;