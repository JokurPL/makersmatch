import { conversation } from 'models';

export const getAllConversation = ({ userId, page = 0, perPage = 1, searchTerm }) => {
  let filters = {};

  if (searchTerm) {
    filters = {
      ...filters,
      messages: {
        some: {
          content: {
            contains: searchTerm,
            mode: 'insensitive'
          }
        }
      }
    };
  }

  return conversation.findMany({
    where: {
      users: {
        some: {
          userId
        }
      },
      ...filters
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
    },
    skip: page * perPage,
    take: perPage
  });
};
