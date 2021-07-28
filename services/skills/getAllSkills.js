import { skill } from 'models';

export default () => {
  return skill.findMany({
    select: {
      id: true,
      name: true
    },
    orderBy: {
      name: 'asc'
    }
  });
};
