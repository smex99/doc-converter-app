module.exports = {
	port: process.env.PORT || 5000,
	storage: '/home/amine/Documents/Dev/doc-converter-app/app/uploads',
	remoteDb: {
		url:
			process.env.DB_URL ||
			'mongodb://Ameziane:Farouha1982**@ds225703.mlab.com:25703/doc_converter',
	},
	db: {
		url: process.env.DB_URL || 'mongodb://localhost:27017/doc_converter',
	},
	authentication: {
		jwtSecret: process.env.JWT_SECRET || 'secret',
		emailSecret: 'consistency',
	},
};
