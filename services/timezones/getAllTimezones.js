import { timezone } from 'models';

export default () => {
  return timezone.findMany({
    select: {
      id: true,
      name: true
    }
  });
};
