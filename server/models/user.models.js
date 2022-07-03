const { Sequelize, DataTypes } = require("sequelize");
// const sequelize = new Sequelize(
//   "postgres://ucyqvcavectqit:993c6b6b48f52981b48a32a8552acd9eeaa7890dc9460a08eec39ac1cc8bbff9@ec2-34-200-35-222.compute-1.amazonaws.com:5432/dehrn05g7os3kd"
// );
const sequelize = new Sequelize({
  database: "dehrn05g7os3kd",
  username: "ucyqvcavectqit",
  password: "993c6b6b48f52981b48a32a8552acd9eeaa7890dc9460a08eec39ac1cc8bbff9",
  host: "ec2-34-200-35-222.compute-1.amazonaws.com",
  port: 5432,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true, // This will help you. But you will see nwe error
      rejectUnauthorized: false, // This line will fix new error
    },
  },
});
// try {
//   sequelize.authenticate();
//   console.log("Connection has been established successfully.");
// } catch (error) {
//   console.error("Unable to connect to the database:", error);
// }
const User = sequelize.define(
  "User",
  {
    // Model attributes are defined here
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
    freezeTableName: true,
  }
);

// `sequelize.define` also returns the model
// console.log(User === sequelize.models.User) // true

exports.User = User;
