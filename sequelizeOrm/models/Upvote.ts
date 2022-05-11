import { Model, DataTypes } from "sequelize";
import sequelize from "sequelizeOrm";
import { TimestampsAndIdType, UpvoteModelType } from "types";

const Upvote = sequelize.define<Model<UpvoteModelType, TimestampsAndIdType>>("upvote", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
});

export default Upvote;
