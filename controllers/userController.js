const poolPromise = require("../database/config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtoken =
  "d6518fefb2dd30b6309b705e17af5e89ac37ad2e3bce16d7c6658e2d5b44d2a0804cbb";

exports.signup = async (req, res) => {
  const { firstname, lastname, email, username, telephone, password } =
    req.body;

  try {
    const pool = await poolPromise();
    //   encrypt the password using bycrypt
    const hashPass = await bcrypt.hash(password, 8);
    //   Todo
    //   check if all  details are available
    //   check if email/username/telephone exists before adding the user
    pool
      .request()
      .input("firstname", firstname)
      .input("lastname", lastname)
      .input("email", email)
      .input("username", username)
      .input("telephone", telephone)
      .input("password", hashPass)
      .execute("users.PROC_InsertUser", (error, result) => {
        if (error) {
          res.status(500).send(error.message);
        } else {
          res.status(201).json({
            user: { firstname, lastname, email, username, telephone },
            message: `${username} has been added successfully`,
          });
        }
      });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const pool = await poolPromise();
    pool
      .request()
      .input("email", email)
      .execute("Users.PROC_CheckEmail", (error, result) => {
        if (error) {
          res.status(500).send(error.message);
        } else {
          const user = result.recordset[0];
          // Generate token
          //   const token = require("crypto").randomBytes(35).toString("hex");
          console.log(user);
          bcrypt
            .compare(password, user.password)
            .then(function (result, error) {
              if (result) {
                res.status(201).json({
                  status: 201,
                  success: true,
                  message: `logged in successfully`,
                  results: [email, password],
                });
              } else
                res.status(401).json({
                  status: 401,
                  success: false,
                  message: "Invalid credentials!",
                  results: [email, password],
                });
            });
        }
      });
  } catch (error) {
    res.status(500).json(error);
  }
};
