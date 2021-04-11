import 'dotenv/config';
import { config, createSchema } from '@keystone-next/keystone/schema';
import { User } from './schemas/User';

const databaseURL =
	process.env.DATABASE_URL ||
	'mongodb://localhost/keystone-sick-fits-tutorial';

const sessionConfig = {
	maxAge: 60 * 60 * 24 * 30,
	secret: process.env.COOKIE_SECRET,
};

export default config({
	server: {
		cors: {
			origin: [process.env.FRONTEND_URL],
			credentials: true,
		},
	},
	db: {
		adapter: 'mongoose',
		url: databaseURL,
		// TODO: Add data seeding here
	},
	lists: createSchema({
		User,
		// TODO Add Schema items
	}),
	ui: {
		// TODO: change for roles
		isAccessAllowed: () => true,
	},
	// TODO: add session values here
});
