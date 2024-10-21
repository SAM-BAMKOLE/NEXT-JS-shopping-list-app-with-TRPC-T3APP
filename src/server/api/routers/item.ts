import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const itemRouter = createTRPCRouter({
  addItem: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.item.create({ data: { name: input.name } });
    }),
  checkItem: publicProcedure
    .input(z.object({ itemId: z.string(), checked: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.item.update({
        where: { id: input.itemId },
        data: { checked: !input.checked },
      });
    }),
  getItems: publicProcedure.query(
    async ({ ctx }) =>
      await ctx.db.item.findMany({ orderBy: { createdAt: "desc" } }),
  ),
  deleteItem: publicProcedure
    .input(z.object({ itemId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.item.delete({ where: { id: input.itemId } });
    }),
});
