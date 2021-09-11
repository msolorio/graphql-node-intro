import jwt from 'jsonwebtoken';

const APP_SECRET = 'I actually like oatmeal raisin cookies';

function getTokenPayload(token: any) {
  return jwt.verify(token, APP_SECRET);
}


function getUserId(req: any, authToken?: any) {
  if (req) {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.replace('Bearer ', '');

      if (!token) {
        throw new Error('No token found');
      }

      const { userId }: any = getTokenPayload(token);

      return userId;
    }

  } else if (authToken) {
    const { userId }: any = getTokenPayload(authToken);

    return userId;
  }

  throw new Error('Not authenticated');
}


export {
  APP_SECRET,
  getUserId
}