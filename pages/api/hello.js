import onlyAuth from 'middlewares/onlyAuth';

const helloApi = async (req, res) => {
  res.statusCode = 200;
  res.json({ user: req.currentUser });
};

export default onlyAuth(helloApi);
