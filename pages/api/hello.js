import { user } from 'models';

export default async (req, res) => {
  const allUsers = await user.findMany();
  res.statusCode = 200;
  res.json({ allUsers });
};
