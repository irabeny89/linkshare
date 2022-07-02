import { Model, DataTypes } from "sequelize";
import sequelize from "sequelizeOrm";
import { sign } from "jsonwebtoken";
import { LinkModelType, UpvoteModelType, UserModelType } from "types";
import Link from "./Link";
import Upvote from "./Upvote";
import { environmentVariables } from "config";
import { randomBytes, createHmac, timingSafeEqual } from "crypto";

const { secret } = environmentVariables;

class User extends Model<UserModelType> {
  name!: string;
  email!: string;
  password!: string;
  id!: string;
  hashedPassword!: string;
  links!: Required<LinkModelType>[];
  upvotes!: Required<UpvoteModelType>[];
  salt!: string;
  async getAccessToken() {
    const { id: subject, email } = this,
      jwtOptions = {
        audience: "user",
        expiresIn: "30d",
        subject,
      };

    return sign({ email }, secret, jwtOptions);
  }
  isValidPassword(password: string) {
    const hash = createHmac("sha256", this.salt).update(password).digest("hex");

    return timingSafeEqual(Buffer.from(hash), Buffer.from(this.hashedPassword));
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.VIRTUAL,
      allowNull: false,
      validate: { len: [8, 20] },
    },
    hashedPassword: {
      type: DataTypes.STRING,
    },
    salt: {
      type: DataTypes.STRING,
      defaultValue: () => randomBytes(16).toString("hex"),
    },
  },
  {
    sequelize,
    modelName: "user",
    hooks: {
      beforeCreate: (user) => {
        user.hashedPassword = createHmac("sha256", user.salt)
          .update(user.password)
          .digest("hex");
      },
    },
  }
);

User.hasMany(Link);
Link.belongsTo(User);
User.hasMany(Upvote);
Upvote.belongsTo(User);

export default User;
