import onlyAuth from 'middlewares/onlyAuth';
import findMatch from 'services/profiles/findMatch';
import likeProfile from 'services/profiles/likeProfile';
import { skipProfile } from 'services/profiles/skipProfile';

const userProfileApi = async (req, res) => {
  const userId = req.currentUser.id;
  switch (req.method) {
    case 'GET': {
      try {
        const profile = await findMatch({ userId });

        res.status(200).json({ profile });
      } catch (err) {
        res.status(422).json({ user: null, error: err });
      }
      break;
    }

    case 'POST': {
      try {
        const { targetUserId } = req.body;
        const { hasMatch, targetUser } = await likeProfile({
          userId,
          targetUserId: Number(targetUserId)
        });

        res.status(200).json({ hasMatch, targetUser });
      } catch (err) {
        res.status(422).json({ hasMatch: false, targetUser: null, error: err.message });
      }
      break;
    }

    case 'DELETE': {
      try {
        const { targetUserId } = req.body;
        const { targetUser } = await skipProfile({
          userId,
          targetUserId: Number(targetUserId)
        });

        res.status(200).json({ targetUser });
      } catch (err) {
        res.status(422).json({ targetUser: null, error: err.message });
      }
      break;
    }

    default: {
      res.status(400);
      break;
    }
  }
};

export default onlyAuth(userProfileApi);
