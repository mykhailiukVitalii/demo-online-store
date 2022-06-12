const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
	if(req.method === "OPTIONS") {
		next() //запрос в след обработчик, если в некст передаем что то то это ошибка и дальше не идем - вылетает ошибка.
	}
	try {
		const token = req.headers.authorization.split(" ")[1] //i.e: Bearer ${token:dfeg}
		//TODO: fix using ApiError
		if(!token) {
			return res.status(403).json({message: "Not Authorised!"})
		}
		const decode = jwt.verify(token, process.env.SECRET_KEY)
		req.user = decode
		next()
	} catch(e) {
		return res.status(403).json({message: "Authorised Error!"})
	}
}