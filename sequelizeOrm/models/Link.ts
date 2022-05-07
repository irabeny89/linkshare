import { Model, DataTypes } from "sequelize";
import sequelize from "sequelizeOrm";
import { LinkModelType, TimestampsAndIdType } from "types";
import Upvote from "./Upvote";

const Link = sequelize.define<Model<LinkModelType, TimestampsAndIdType>>(
  "link",
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    headline: { type: DataTypes.STRING, allowNull: false },
    url: { type: DataTypes.STRING, allowNull: false },
  },
);

Link.hasMany(Upvote);
Upvote.belongsTo(Link);

(async () => await Link.sync())();

export default Link;
