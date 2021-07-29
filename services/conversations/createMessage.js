import { conversation as conversationModel, conversationMessage } from 'models';

export const create = async ({ userId, conversationId, content }) => {
  const conversation = await conversationModel.findFirst({
    where: {
      id: conversationId,
      users: {
        some: {
          userId
        }
      }
    }
  });

  if (!conversation) throw new Error('conversation_not_found');

  const message = await conversationMessage.create({
    data: {
      conversation: {
        connect: {
          id: conversationId
        }
      },
      user: {
        connect: {
          userId
        }
      },
      content,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  });

  return message;
};
