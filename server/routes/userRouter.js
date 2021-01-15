const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Model/userModel');
const auth = require('../middleware/auth');

router.post('/register', async (req, res) => {
    try {
        let { firstName, lastName, email, password, passwordCheck } = req.body;

        if (!firstName || !lastName || !email || !password || !passwordCheck)
            return res.status(400).json({ message: "Please enter all fields" })
        if (password.length < 6)
            return res.status(400).json({ message: "Password must contain at least 6 characters" })
        if (password !== passwordCheck)
            return res.status(400).json({ message: "Password doesn't match" })

        const existingUser = await User.findOne({ email: email })
        if (existingUser)
            return res.status(400).json({ message: "An account with this email already exist" })

        const salt = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(password, salt)

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash
        })

        const savedUser = await newUser.save();
        res.json(savedUser);

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.post('/login', async (req, res) => {
    try {
        let { email, password } = req.body;

        if (!email || !password)
            return res.status(400).json({ message: "Please enter all fields" })

        const user = await User.findOne({ email: email })
        if (!user)
            return res.status(400).json({ message: "Please provide a valid username and password" })

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch)
            return res.status(400).json({ message: "Please provide a valid username and password" })

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        res.json({
            token,
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            watchlist: user.watchlist
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/tokenIsValid', async (req, res) => {
    try {
        const token = req.header('x-auth-token');
        if (!token) return res.json(false);

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified) return res.json(false);

        const user = await User.findById(verified.id);
        if (!user) return res.json(false);

        return res.json(true);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user);
        res.json({
            firstName: user.firstName,
            lastName: user.lastName,
            id: user.id,
            email: user.email,
            watchlist: user.watchlist
        })
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

module.exports = router