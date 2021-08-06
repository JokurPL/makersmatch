import { filter, profileCheck, user } from 'models';

const checkedId = async (userId) => {
  const profiles = await profileCheck.findMany({
    where: {
      userId
    },
    select: {
      targetId: true
    }
  });

  return profiles.map((profile) => profile.targetId);
};

const findMatch = async ({ userId }) => {
  const userFilter = await filter.findUnique({
    where: {
      userId
    }
  });

  if (!userFilter) {
    return null;
  }

  const ids = await checkedId(userId);
  const profile = await user.findFirst({
    where: {
      skill: userFilter.skill,
      timezone: userFilter.timezone,
      NOT: {
        id: { in: ids }
      }
    }
  });

  return profile;
};

export default findMatch;
