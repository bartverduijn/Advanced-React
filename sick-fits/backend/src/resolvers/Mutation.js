const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Mutations = {
    createItem(parent, args, ctx, info) {
        // TODO: Check if user is logged in
        return ctx.db.mutation.createItem({ data: { ...args } }, info);
    },

    updateItem(parent, args, ctx, info) {
        // Take copy of the fields to update, but NEVER change the id
        const updates = { ...args };
        delete updates.id;

        return ctx.db.mutation.updateItem({ data: updates, where: { id: args.id } }, info);
    },

    async deleteItem(parent, args, ctx, info) {
        const where = { id: args.id };
        // 1. Find item based on ID, and return ID and title (as we didn't mention these in a query in the frontend)
        const item = await ctx.db.query.item({ where }, `{ id title }`);
        // 2. Check if user is allowed to delete the item
        // TODO
        // 3. Delete the item
        return ctx.db.mutation.deleteItem({ where }, info);
    },

    async signup(parent, args, ctx, info) {
        const email = args.email.toLowerCase();
        const password = await bcrypt.hash(args.password, 10);

        const user = await ctx.db.mutation.createUser(
            {
                data: {
                    name: args.name,
                    email,
                    password,
                    permissions: { set: ['USER'] }, // Use set because we're using an enum
                },
            },
            info
        );

        // Create JWT token for user to login immediately
        const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
        // Set token as a cookie to bring with every response
        ctx.response.cookie('token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year cookie
        });

        return user;
    },

    async signin(parent, { email, password }, ctx, info) {
        // 1. Check if there is a user with that email
        const user = await ctx.db.query.user({ where: { email } });
        if (!user) {
            throw new Error('No such user found with given email');
        }
        // 2. Check if the password for that user is correct
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            throw new Error('Invalid Password!');
        }
        // 3. Create JWT token for user to login immediately
        const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
        // 4. Set token as a cookie to bring with every response
        ctx.response.cookie('token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year cookie
        });

        return user;
    },

    signout(parent, args, ctx, info) {
        // response.clearCookie comes from cookieParser in index.js
        ctx.response.clearCookie('token');
        return { message: 'Goodbye!' };
    },
};

module.exports = Mutations;
