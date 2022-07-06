const poolPromise = require("../database/config");

exports.signup = async (req, res) => {
  const { firstname, lastname, email, username, telephone, password } =
    req.body;

  try {
    const pool = await poolPromise();

    //   Todo
    //   check if email/username/telephone exists before adding the user
    pool
      .request()
      .input("firstname", firstname)
      .input("lastname", lastname)
      .input("email", email)
      .input("username", username)
      .input("telephone", telephone)
      .input("password", password)
      .execute("users.PROC_InsertUser", (error, result) => {
        if (error) {
          res.status(500).send(error.message);
        } else {
          return res.status(201).json({
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
          console.log(user);
          if (password === user.password) {
            return res.status(201).json({
              status: 201,
              success: true,
              message: `${email} logged in successfully`,
              results: [email, password],
            });
          } else {
            return res.status(401).json({
              status: 401,
              success: false,
              message: "Invalid credentials!",
              results: [email, password],
            });
          }
        }
      });
    //     .execute("Users.PROC_CheckEmail", function (err, result) => {

    //   })
  } catch (error) {
    res.status(500).json(error);
  }
};
