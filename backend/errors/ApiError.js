class ApiError extends Error {
	constructor(status, message) {
		super();
		this.status = status;
		this.message = message;
	}
	//TODO: зачем и почему статик
	static badRequest(messsage) {
		return new ApiError(400, messsage);
	}

	static notFound(messsage) {
		return new ApiError(404, messsage);
	}

	static internl(messsage) {
		return new ApiError(500, messsage);
	}
}

module.exports = ApiError