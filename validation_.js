const validate_raffle = (req, res, next) => {
  let { name } = req.body;

  if (name.length > 3 && name.length < 1000) {
    req.vaildBody = { name };
    next();
  } else {
    res.status(400).json({ error: "name not vaild." });
  }

}

module.exports = { validate_raffle };