import { Model, DataTypes } from "sequelize";
import sequelize from "sequelizeOrm";
import { sign } from "jsonwebtoken";
import { TimestampsAndIdType, UserModelType } from "types";
import Link from "./Link";
import Upvote from "./Upvote";
import config from "config";
import { randomBytes, createHmac } from "crypto";

class User extends Model<UserModelType, TimestampsAndIdType> {
  email!: string;
  id!: string;
  async getAccessToken() {
    return sign({ email: this.email }, config.environmentVariable.secret, {
      audience: "user",
      expiresIn: "30d",
      subject: this.id,
    });
  }
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.VIRTUAL, allowNull: false },
    hashedPassword: {
      type: DataTypes.STRING,
      defaultValue: function (this) {
        return (
          // @ts-ignore
          createHmac("sha256", this.salt)
            // @ts-ignore
            .update(this.password)
            .digest("hex")
        );
      },
    },
    salt: {
      type: DataTypes.STRING,
      defaultValue: () => randomBytes(16).toString("hex"),
    },
  },
  { sequelize }
);

User.hasMany(Link);
Link.belongsTo(User);
User.hasMany(Upvote);
Upvote.belongsTo(User);

(async () => await User.sync())();

export default User;
