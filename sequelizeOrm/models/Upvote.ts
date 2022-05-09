import { Model, DataTypes } from "sequelize";
import sequelize from "sequelizeOrm";
import { TimestampsAndIdType, UpvoteModelType } from "types";

const Upvote = sequelize.define<Model<UpvoteModelType, TimestampsAndIdType>>("upvote", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  // userId: { type: DataTypes.UUID, allowNull: false, references: "user" },
  // linkId: { type: DataTypes.UUID, allowNull: false, references: "link" },
});

export default Upvote;
