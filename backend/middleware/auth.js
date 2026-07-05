import jwt from 'jsonwebtoken';

const authenticate = (request, response, next) => {
    const authHeader = request.headers.authorization;
    const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

    if (!token) {
        return response.status(401).json({ message: 'Authentication token missing' });
    }

    try {
        request.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (error) {
        return response.status(401).json({ message: 'Invalid or expired token' });
    }
};

export default authenticate;
