import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database/linkshare.sqlite",
});
// test database connection
sequelize.authenticate().then(
  () => (console.log("Database connected."), sequelize.sync()),
  () => console.error("Database connection failed!")
);

export default sequelize;
