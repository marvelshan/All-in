const authorizeAdmin = async (req, res, next) => {
  try {
    const { userRole } = req.body;
    if (userRole !== 'admin') {
      return res.status(400).json({
        success: false,
        message: 'Your do not have authenticate',
      });
    }
    next();
  } catch (error) {
    res.status(500).send(`middleware authenticate is error on ${error}`);
  }
};

export default authorizeAdmin;
