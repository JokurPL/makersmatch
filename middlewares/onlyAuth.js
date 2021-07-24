const { getSession } = require('next-auth/client');
import { user } from 'models';

const onlyAuth = (handler) => {
  return async (req, res) => {
    const session = await getSession({ req });

    if (!session) {
      return res.status(401).json({
        success: false,
        message: 'Please log in to get access.'
      });
    }

    req.currentUser = await user.findUnique({
      where: {
        email: session.user.email
      }
    });

    return handler(req, res);
  };
};

export default onlyAuth;
