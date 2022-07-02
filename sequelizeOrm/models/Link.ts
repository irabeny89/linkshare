import { Model, DataTypes } from "sequelize";
import sequelize from "sequelizeOrm";
import { LinkInputType, LinkModelType } from "types";
import Upvote from "./Upvote";

const Link = sequelize.define<Model<LinkModelType, LinkInputType>>("link", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  headline: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isUrl: true,
    },
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false
  }
});

Link.hasMany(Upvote);
Upvote.belongsTo(Link);

export default Link;
