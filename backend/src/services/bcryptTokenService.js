const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateJwt = (id, email, role) => {
    return jwt.sign(
        { id, email, role },
        process.env.SECRET_KEY,
        { expiresIn: "24h" }
    );
};

const bcryptComparePwd = (inputPwd, dbPwd) => {
	return bcrypt.compareSync(inputPwd, dbPwd);
};

const hashPassword = async (pwd) => {
    //HASH user password
    const salt = await bcrypt.genSalt(+process.env.BCRYPT_SALT_ROUNDS);

	return await bcrypt.hash(pwd, salt);
};

module.exports = {
    generateJwt,
    bcryptComparePwd,
    hashPassword
}