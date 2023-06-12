const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../modals/User");
const SignupValidator = require("../Validator/SignupValidator");
const loginValidator = require("../Validator/loginValidator");
const JWT_SECRET = 'mynewpassword'

exports.signup = async (req, res) => {
    let success = false
    const { errors, isValid } = SignupValidator(req.body);
    // const errors = validationResult(req);

    if (!isValid) {
        return res.status(400).json({ success: false, message: { errors } });
    }
    try {

        let user = await User.findOne({ email: req.body.email })
        if (user) {
            let success = false
            return res.status(400).json({ success, error: "Can not repeat same email id " })
        }
        const salt = await bcrypt.genSalt(10)
        const secpass = await bcrypt.hash(req.body.password, salt)

        user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: secpass,
        })
        await user.save()

        const data = {
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET)
        let success = true
        res.json({ success, data, authtoken })
        // .then(user => res.json(user));
        // jwt.sign(
        //     payload,
        //     'randomstring', {
        //     expiresIn: 10000
        // },
        //     (err, token) => {
        //         if (err) throw err;
        //         res.status(200).json({
        //             token
        //         })
        //     }
        // )

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server Error...")
    }
};

exports.login = async (req, res, next) => {
    const { errors, isValid } = loginValidator(req.body);

    if (!isValid) {
        return res.status(400).json({ success: false, message: { errors } });
    }
    let success = false
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({ success, errors: errors.array() });
    // }
    const { email, password } = req.body
    try {
        let user = await User.findOne({ email })
        if (!user) {
            let success = false
            return res.status(400).json({ success, error: "User does not exists.." })
        }
        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            return res.status(400).json({ success, error: "password does not match.." })
        }
        const data = {
            user: {
                id: user.id,
                username: user.username,
                email: user.email
                // username: "Coder infosys",
                // email: "coderinfosys@gmail.com",
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET)
        let success = true
        res.json({ success, data, authtoken })
        // console.log(data)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server Error...")
    }
}

exports.forgotPassword = async (req, res, next) => {
    try {
        const { errors, isValid } = loginValidator(req.body);
        const { email, password } = req.body;
        if (!isValid) {
            return res.status(400).json({ status: false, message: { errors } });
        }

        const isExisiting = await User.findOne({ email });
        if (!isExisiting) {
            // const error = new HttpError(
            //   "Forgot Password Failed, Please check your email address.",
            //   422
            // );
            // next(error);
            return res.status(500).json({
                success: false,
                message: "Forgot Password Failed, Please check your email address.",
            });
        }

        const isValidatePassword = await bcrypt.compare(
            password,
            isExisiting.password
        );
        if (isValidatePassword) {
            // const error = new HttpError(
            //   "New Password should be different from previous password.",
            //   422
            // );
            return res.status(500).json({
                success: false,
                message: "New Password should be different from previous password.",
            });
        }
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 12);
        } catch (err) {
            return res.status(500).json({
                status: false,
                message: "Could not update password, please try again.",
            });
        }
        const isUpdated = await User.findOneAndUpdate(email, {
            password: hashedPassword,
        });
        if (isUpdated) {
            res.json({ success: true, message: "Password updated" });
        }
    } catch (error) {
        console.log("error", error);
    }
};

exports.getProfile = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server Error...")
    }
};