import { markAsRead } from './markAsRead';
import { conversation } from 'models';

const getConversation = async ({ id, userId }) => {
  await markAsRead({ conversationId: id, userId });

  return conversation.findFirst({
    where: {
      id,
      users: {
        some: {
          userId
        }
      }
    },
    include: {
      users: {
        include: {
          user: true
        }
      },
      messages: {
        include: {
          user: true
        }
      }
    }
  });
};

export default getConversation;
