import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { formRouter } from "./routers/form";

export const appRouter = createTRPCRouter({
  form: formRouter,
});

export type AppRouter = typeof appRouter;
export const createCaller = createCallerFactory(appRouter);
