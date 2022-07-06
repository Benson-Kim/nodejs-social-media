const poolPromise = require("../database/config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
    const request = await pool.request();
    request.input("firstname", firstname);
    request.input("lastname", lastname);
    request.input("email", email);
    request.input("username", username);
    request.input("telephone", telephone);
    request.input("password", hashPass);
    const result = await request.execute("users.PROC_InsertUser");

    console.log(process.env.JWTKEY);
    const token = await jwt.sign({ email }, process.env.JWTKEY, {
      expiresIn: "24h",
    });

    res.status(201).json({
      user: { firstname, lastname, email, username, telephone },
      message: `${username} has been added successfully`,
      token,
    });
  } catch (error) {
    console.log(error);
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
          console.log(user);
          bcrypt
            .compare(password, user.password)
            .then(async function (result, error) {
              if (result) {
                const token = await jwt.sign(
                  { email: user.email },
                  process.env.JWTKEY,
                  {
                    expiresIn: "24h",
                  }
                );
                res.status(201).json({
                  status: 201,
                  success: true,
                  message: `logged in successfully`,
                  results: user,
                  token,
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
