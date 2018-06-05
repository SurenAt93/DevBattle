import auth from '../libs/auth';

export default async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    res.status(401).send({ message: 'Authentication failed.'});
  } else {
    const decoded = await auth.verify(token);

    // TODO ::: Fix or correct exparation time for tockens
    if (!decoded || decoded.exp <= Date.now() / 1000) {
      res.clearCookie('token');
      res.status(401).send({ message: 'Authentication failed.' }); 
    } else {
      req.decodedToken = decoded;
      next();
    }
  }
}