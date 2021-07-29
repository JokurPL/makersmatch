const { conversation } = require('models');

const getConversation = ({ id, userId }) =>
  conversation.findFirst({
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

export default getConversation;
