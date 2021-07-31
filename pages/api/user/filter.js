import onlyAuth from 'middlewares/onlyAuth';
import { upsertFitler } from 'services/filters/upsert';

const userFilterApi = async (req, res) => {
  switch (req.method) {
    case 'PUT': {
      try {
        const payload = req.body;
        const filter = await upsertFitler({
          userId: req.currentUser.id,
          payload
        });

        res.status(200).json({ filter });
      } catch (err) {
        res.status(422).json({ filter: null, error: err });
      }
      break;
    }

    default: {
      res.status(400);
      break;
    }
  }
};

export default onlyAuth(userFilterApi);
