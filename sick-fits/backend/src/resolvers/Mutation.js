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
};

module.exports = Mutations;
