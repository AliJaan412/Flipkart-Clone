import jwt from 'jsonwebtoken';
import User from '../model/userSchema.js';

const generateToken = (user) =>
    jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '7d' });

export const userLogIn = async (request, response) => {
    try {
        const user = await User.findOne({ username: request.body.username });
        const isValidPassword = user && await user.comparePassword(request.body.password);

        if (isValidPassword) {
            const token = generateToken(user);
            return response.status(200).json({ message: `${user.username} login successfull`, token, username: user.username });
        } else {
            return response.status(401).json({ message: 'Invalid Login' });
        }

    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}

export const userSignUp = async (request, response) => {
    try {
        const exist = await User.findOne({ username: request.body.username });
        if(exist) {
            return response.status(401).json({ message: 'User already exist'});
        }
        const newUser = new User(request.body);
        await newUser.save();
        const token = generateToken(newUser);
        response.status(200).json({ message: 'User created successfully', token, username: newUser.username });

    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}



