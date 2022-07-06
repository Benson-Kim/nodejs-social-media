const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const sql = require("mssql/msnodesqlv8");

const poolPromise = require("../database/config");

exports.register = async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    username,
    telephone,
    password,
    confirmpassword,
  } = req.body;

  try {
    let pool = await poolPromise();

    let userexists = pool.query`select * from Users.[User] where username = ${username}`;

    if (userexists.length > 0) {
      return res.render("register", {
        message: "Username already exists",
      });
    }

    if (password !== confirmpassword) {
      return res.render("register", {
        message: "Password does not match",
      });
    }

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        // Store hash in your password DB.
        let userinsert = pool.query`INSERT INTO Users.[User] (firstname, lastname,username,email,telephone,password) 
      VALUES (${firstname},${lastname},${username},${email},${telephone},${hash})`;

        if (userinsert) {
          return res.render("login", {
            message: "user added successfully",
          });
        } else {
          return res.render("register", {
            message: "user not added successfully",
          });
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
};

exports.login = async (req, res) => {
  try {
    let pool = await poolPromise();

    const { email, password } = req.body;

    pool.query`SELECT 1 FROM SELECT 1 FROM Users.[User] WHERE email=${email}`.then(
      (user) => {
        if (user === null) {
          res.render("login", {
            message: "invalid credintials",
          });
        } else {
          bcrypt.compare(password, user.password, function (err, result) {
            if (result) {
              const token = jwt.sign(
                {
                  email: user.email,
                  userId: user.userId,
                },
                "secret",
                function (err, token) {
                  return res.render("login", {
                    message: "user logged in",
                    token: token,
                  });
                }
              );
            } else {
              return res.render("login", {
                message: "invalid credintials",
              });
            }
          });
        }
      }
    );
  } catch (error) {
    res.status(500).json({
      message: "something went wrong",
    });
  }
};
