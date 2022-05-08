const jwt = require("jsonwebtoken");

let HAS_ROLE = false

module.exports = function(roles) {
	return function(req, res, next) {
		if(req.method === "OPTIONS") {
			next()
		}
		try {
			let hasRole = false
			const token = req.headers.authorization.split(" ")[1] //i.e: Bearer ${token:dfeg}
			if(!token) {
				return res.status(403).json({message: "Not Authorised!"})
			}
			const { role: userRole } = jwt.verify(token, process.env.SECRET_KEY)
			if(roles.includes(userRole)) {
				hasRole = true;
			}
			if(!hasRole) {
				return res.status(403).json({message: "User does not have access."})
			}

			next()
		} catch(e) {
			return res.status(403).json({message: "Authorised Error!"})
		}
	}
}