import { filter } from 'models';

export const upsertFitler = ({ userId, payload }) =>
  filter.upsert({
    where: {
      userId
    },
    update: {
      skill: payload.skill,
      timezone: payload.timezone,
      updatedAt: new Date()
    },
    create: {
      skill: payload.skill,
      timezone: payload.timezone,
      user: {
        connect: {
          id: userId
        }
      }
    }
  });
