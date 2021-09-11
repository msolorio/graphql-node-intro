import jwt from 'jsonwebtoken';
var APP_SECRET = 'I actually like oatmeal raisin cookies';
function getTokenPayload(token) {
    return jwt.verify(token, APP_SECRET);
}
function getUserId(req, authToken) {
    if (req) {
        var authHeader = req.headers.authorization;
        if (authHeader) {
            var token = authHeader.replace('Bearer ', '');
            if (!token) {
                throw new Error('No token found');
            }
            var userId = getTokenPayload(token).userId;
            return userId;
        }
    }
    else if (authToken) {
        var userId = getTokenPayload(authToken).userId;
        return userId;
    }
    throw new Error('Not authenticated');
}
export { APP_SECRET, getUserId };
