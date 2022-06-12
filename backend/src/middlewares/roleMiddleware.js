const jwt = require("jsonwebtoken");

module.exports = function(roles) {
	return function(req, res, next) {
		if(req.method === "OPTIONS") {
			next();
		}

		try {
			const token = req.headers.authorization.split(" ")[1]; //i.e: Bearer ${token:dfeg}

			if(!token) {
				return res.status(403).json({message: "Not Authorised!"});
			}
			const { role: userRole } = jwt.verify(token, process.env.SECRET_KEY);

			if(!roles.includes(userRole)) {
				return res.status(403).json({message: "User does not have access."});
			}

			next();
		} catch(e) {
			return res.status(403).json({message: "Authorised Error!"});
		}
	}
}