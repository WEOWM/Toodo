const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    let token = req.headers.authorization;
    if (!token) return res.status(401).send("Access Denied / Unauthorized request");

    try {
        token = token.split(' ')[1] // Remove Bearer from string

        // if (token === 'null' || !token) return res.status(401).send('Unauthorized request');
        if (token === 'null' || !token) return res.status(401).json({message : 'Unauthorized request'});

        let verifiedUser = jwt.verify(token, process.env.JWT_SECRET);
        // if (!verifiedUser) return res.status(401).send('Unauthorized request')
        if (!verifiedUser) return res.status(401).json({message : 'Token expired'})

        req.user = verifiedUser;
        next();

    } catch (error) {
        res.status(400).json({message :   'Invalid token'});
    }

}

module.exports = verifyToken;