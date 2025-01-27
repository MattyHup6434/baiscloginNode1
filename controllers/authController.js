const userService = require('../service/userService'); 


const registerUser = async (req, res) => {
  const { username, password, role_code, fullname, email, address } = req.body;

  try {
    const response = await userService.registerUser(username, password, role_code, fullname, email, address);
    res.status(201).json(response);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};


const loginUser = async (req, res) => {
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
    res.status(200).json({ token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser
};
