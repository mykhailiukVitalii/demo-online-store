const ApiError = require("../errors/ApiError");

module.exports = function (err, req, res, next) {
	if (err instanceof ApiError) { //TODO: почитать про интсенс
		return res.status(err.status).json({message: err.message});
	}
	//TODO: вопрос - зачем и почему и есть какие плюсы в этом использовании мидлваре?
	return res.status(500).json({message: "Unknown Error: " + err.message});
}