import auth from "@/features/auth/server/route";
import workspaces from "@/features/workspaces/server/route";
import { Hono } from "hono";
import { handle } from "hono/vercel";

const app = new Hono().basePath("/api");

export const routes = app.route("/auth", auth).route("/workspaces", workspaces);

// tip：忘记导出restful type会导致405
export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
