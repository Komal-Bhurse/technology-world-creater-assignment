import User from '../models/user.js'
import { generateToken } from '../services/user.js'
import bcrypt from 'bcrypt'

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

        res.status(201).json({ massage: 'Registered successfully', data: response, error: '' })

        res.redirect('/scp/dashboard');
       
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

        const user = User.findOne({ email });
      
        if (!user || !(await bcrypt.compare(password, user.password))) {
          return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = generateToken(user);

        res.cookie("twc_uid", token, {
            secure: true,
            domain: "twc-eight.vercel.app",
        });

        res.status(201).json({ massage: 'Registered successfully', data: response, error: '' })

        res.redirect('/scp/dashboard');

        res.status(200).json({ massage: 'Signin successful', data: user, error: '' })

    } catch (error) {

        return res.status(505).json({ massage: 'faild', data: '', error: error?.toString() })

    }

};

const Logout = (req, res) => {
    try {
        res.clearCookie("twc_uid");

        return res.status(202).json({ massage: 'success', data: '', error: '' })

    } catch (error) {
        return res.status(505).json({ massage: 'faild', data: '', error: error.toString() })
    }

};

export { Register, Login, Logout }