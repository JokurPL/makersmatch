import { conversation } from 'models';

export const totalCount = async ({ userId, searchTerm }) => {
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

  return conversation.count({
    where: {
      users: {
        some: {
          userId
        }
      },
      ...filters
    }
  });
};
