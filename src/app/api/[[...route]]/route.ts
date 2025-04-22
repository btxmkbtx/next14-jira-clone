/**
 * 有关动态路由的概念参考官网解释--Optional Catch-all
 * https://nextjs.org/docs/pages/building-your-application/routing/dynamic-routes
 */
import auth from "@/features/auth/server/route";
import members from "@/features/members/server/route";
import projects from "@/features/projects/server/route";
import tasks from "@/features/tasks/server/route";
import workspaces from "@/features/workspaces/server/route";
import { Hono } from "hono";
import { handle } from "hono/vercel";

const app = new Hono().basePath("/api");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app
  .route("/auth", auth)
  .route("/workspaces", workspaces)
  .route("/members", members)
  .route("/projects", projects)
  .route("/tasks", tasks);

// tip：忘记导出restful type会导致405
export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
