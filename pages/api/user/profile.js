import onlyAuth from 'middlewares/onlyAuth';
import { updateProfile } from 'services/profiles/update';

const userProfileApi = async (req, res) => {
  switch (req.method) {
    case 'PUT': {
      try {
        const payload = req.body;
        const user = await updateProfile({ userId: req.currentUser.id, payload });

        return res.status(200).json({ user });
      } catch (err) {
        res.status(422).json({ user: null, error: err });
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
