import onlyAuth from 'middlewares/onlyAuth';
import { getAllConversation } from 'services/conversations/getAllConversations';
import { unreadCount } from 'services/conversations/unreadCount';

const conversationApi = async (req, res) => {
  switch (req.method) {
    case 'GET': {
      try {
        const conversations = await getAllConversation({ userId: req.currentUser.id });
        const unread = await unreadCount({ userId: req.currentUser.id });

        res.status(200).json({ conversations, unread });
      } catch (error) {
        console.log(error);
        res.status(422).json({ conversations: [], unread: 0, error });
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
