///^[\p{L}\p{N}]+$/u = all unicode letter from different languages.
const unicode_letter_regex = /^[\p{L}\p{N} ]+$/u;
const email_regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const phone_regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
const secret_token_regex = /^[A-Za-z0-9]{6}$/;
/////////////////////////////////////////////////
const validate_raffle = (req, res, next) => {
  let { name, secret_token } = req.body;

  if (name.length < 3 || name.length > 999) {
    res.status(400).json({ error: "the length of name should between 3-999." });
    return;
  }
  if (!unicode_letter_regex.test(name)) {

    res.status(400).json({ error: "only support all unicode letter from different languages plus space." });
    return;
  }

  if (!secret_token_regex.test(secret_token)) {
    res.status(400).json({ error: "A secret token must be comprised of only English letters and numbers, with a total length of 6 characters." });
    return;
  }

  req.vaildBody = { name, secret_token };
  next();
}

const validate_id = (req, res, next) => {
  let { id } = req.params;
  if (!Number.isInteger(Number(id)) || id < 0) {
    res.status(400).json({ error: "id not vaild." });
    return;
  }
  req.vaildParams = { id: Number(id) };
  next();
}

const validate_token = (req, res, next) => {
  const { secret_token } = req.body;
  if (!secret_token_regex.test(secret_token)) {
    res.status(400).json({ error: "A secret token must be comprised of only English letters and numbers, with a total length of 6 characters." });
    return;
  }
  req.vaildBody = { secret_token };
  next();
}

const validata_participant = (req, res, next) => {
  let { firstname, lastname, email, phone } = req.body;

  if (!validate(firstname)) {
    res.status(400).json({ error: "length of firstname needs to 2 ~ 1000, with no symbol." });
    return;
  }

  if (!validate(lastname)) {
    res.status(400).json({ error: "length of lastname needs to 2 ~ 1000, with no symbol." })
    return;
  }

  if (!email_regex.test(email)) {
    res.status(400).json({ error: "email not vaild." })
    return;
  }

  if (phone && !phone_regex.test(phone)) {
    res.status(400).json({ error: "phone number not vaild." });
    return;
  }

  req.vaildBody = { firstname, lastname, email, phone };
  next();

  //////////////////////
  function validate(str) {
    if (str.length < 2 || str.length > 999 || !unicode_letter_regex.test(str)) return false;
    return true;
  }
}
module.exports = { validate_raffle, validate_id, validata_participant, validate_token };