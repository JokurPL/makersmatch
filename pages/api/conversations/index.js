import onlyAuth from 'middlewares/onlyAuth';
import getAllConversation from 'services/conversations/getAllConversations';

const conversationApi = async (req, res) => {
  switch (req.method) {
    case 'GET': {
      try {
        const conversations = await getAllConversation({ userId: req.currentUser.id });

        res.status(200).json({ conversations });
      } catch (error) {
        res.status(422).json({ conversations: [], error });
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
