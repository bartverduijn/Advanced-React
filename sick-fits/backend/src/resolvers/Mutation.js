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
};

module.exports = Mutations;
