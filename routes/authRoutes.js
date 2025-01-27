const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userService = require('../service/userService');


router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await userService.findByUsername(username);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }


        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }


        const token = jwt.sign({ userId: user.user_admin_id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            fullname: user.fullname,
            username: user.username,
            token,
            message: "Login successful"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});


router.post('/register', async (req, res) => {
    const { username, password, roleCode, fullname, email, address } = req.body;

    try {
        const response = await userService.registerUser(username, password, roleCode, fullname, email, address);
        res.status(201).json(response);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
});


router.get('/findByUsername/:username', async (req, res) => {
    const { username } = req.params;

    try {
        const user = await userService.findByUsername(username);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
