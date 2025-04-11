import User from '../models/user.js'
import { generateToken } from '../services/auth.js'
import bcrypt from 'bcryptjs'

const Register = async (req, res) => {

    try {
        const { name, email, password, phone } = req.body;

        if (!name || !email || !password || !phone) {
            return res.status(400).json({ message: 'Please fill all the fields' });
        }

        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: 'The email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const response = await User.create({ name, email, password: hashedPassword, phone });

        const token = generateToken(response);

        res.cookie("twc_uid", token, {
            secure: true,
            domain: "twc-eight.vercel.app",
        });

        res.status(201).json({ message: 'success', data: response, error: '' })
       
    } catch (error) {
        res.status(500).json({ message: 'Failed to create user' });
    }
};

const Login = async (req, res) => {

    try {

        const { email, password } = req.body;

        if ( !email){
            return res.status(400).json({ message: 'Please fill the email' });
        }
        if(!password) {
            return res.status(400).json({ message: 'Please fill the password' });
        }

        const user = await User.findOne({ email });

        if(!user) {
            return res.status(404).json({ message: 'faild', data: '', error: 'Invalid email' });
        }

        console.log(user)

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        console.log(isPasswordMatch)
      
        if (!isPasswordMatch) {
          return res.status(404).json({ message: 'faild', data: '', error: 'Invalid password' });
        }

        const token = generateToken(user);

        res.cookie("twc_uid", token, {
            secure: true,
            domain: "twc-eight.vercel.app",
        });
        

        res.status(200).json({ message: 'success', data: user, error: '' })

    } catch (error) {

        return res.status(500).json({ message: 'faild', data: '', error: error?.toString() })

    }

};

const Logout = (req, res) => {
    try {
        res.clearCookie("twc_uid");

        return res.status(200).json({ message: 'success', data: '', error: '' })

    } catch (error) {
        return res.status(500).json({ message: 'faild', data: '', error: error.toString() })
    }

};

export { Register, Login, Logout }
