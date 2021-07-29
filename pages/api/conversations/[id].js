import onlyAuth from 'middlewares/onlyAuth';
import { create } from 'services/conversations/createMessage';
import getConversation from 'services/conversations/getConversation';

const conversationApi = async (req, res) => {
  switch (req.method) {
    case 'GET': {
      try {
        const conversation = await getConversation({
          id: Number(req.query.id),
          userId: req.currentUser.id
        });

        if (!conversation) throw Error('conversation_not_found');

        res.status(200).json({ conversation });
      } catch (error) {
        res.status(422).json({ conversation: null, error });
      }
      break;
    }

    case 'POST': {
      try {
        const conversation = await create({
          ...req.body,
          userId: req.currentUser.id,
          conversationId: Number(req.query.id)
        });

        res.status(200).json({ conversation });
      } catch (error) {
        res.status(422).json({ conversation: null, error });
      }
      break;
    }

    default: {
      res.status(400);
      break;
    }
  }
};

export default onlyAuth(conversationApi);
