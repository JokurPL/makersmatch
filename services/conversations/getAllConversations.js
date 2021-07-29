const { conversation } = require('models');

const getAllConversation = ({ userId }) =>
  conversation.findMany({
    where: {
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

export default getAllConversation;
