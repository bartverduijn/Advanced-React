const { forwardTo } = require('prisma-binding');

const Query = {
    items: forwardTo('db'),
    item: forwardTo('db'),
    itemsConnection: forwardTo('db'),
    me(parent, args, ctx, info) {
        // If there is no user found, return null (do not throw an error, because someone might just not be logged in)
        if (!ctx.request.userId) {
            return null;
        }

        return ctx.db.query.user({ where: { id: ctx.request.userId } }, info);
    },
};

module.exports = Query;
