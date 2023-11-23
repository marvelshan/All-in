import jwt from 'jsonwebtoken';

const jwtoperator = async (req, res) => {
  try {
    const { userId, name, email } = req.body;
    const user = { userId, name, email };
    const privateKey = process.env.JWT_KEY;
    const accessExpired = 60;
    const accessToken = jwt.sign({ user }, privateKey);
    const dataArray = { accessToken, accessExpired, user };
    const data = { data: dataArray };
    res.cookie('jwtToken', accessToken).json(data);
  } catch (error) {
    console.log(`middleware jwtoperator:${error}`);
    res.status(500);
  }
};

export default jwtoperator;
