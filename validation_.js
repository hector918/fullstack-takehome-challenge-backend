const validate_raffle = (req, res, next) => {
  let { name } = req.body;

  if (name.length < 3 || name.length > 999) {
    res.status(400).json({ error: "the length of name should between 3-999." });
    return;
  }
  if (!/^[\p{L}\p{N} ]+$/u.test(name)) {
    ///^[\p{L}\p{N}]+$/u = all unicode letter from different languages.
    res.status(400).json({ error: "only support all unicode letter from different languages plus space." });
    return;
  }
  req.vaildBody = { name };
  next();
}

module.exports = { validate_raffle };