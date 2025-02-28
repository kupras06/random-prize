import "dotenv/config";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import crypto from 'node:crypto'
import { vikeHandler } from "./server/vike-handler";
import { telefuncHandler } from "./server/telefunc-handler";
import { createHandler, createMiddleware } from "@universal-middleware/express";
import { dbMiddleware } from "./server/db-middleware";
import express from "express";
import cookieParser  from 'cookie-parser'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const root = __dirname;
const port = process.env.PORT ? Number.parseInt(process.env.PORT, 10) : 3000;
const hmrPort = process.env.HMR_PORT
	? Number.parseInt(process.env.HMR_PORT, 10)
	: 24678;


const deviceIdMiddleware = (req, res, next) => {
  const cookieName = 'device_id';
  const deviceId = req.cookies[cookieName] || generateDeviceId(req);
	console.log({deviceId})
  // Set cookie if not exists or invalid
  if (!req.cookies[cookieName]) {
    res.cookie(cookieName, deviceId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 365 * 24 * 60 * 60 * 1000, // 1 year
      sameSite: 'strict'
    });
  }

  req.deviceId = deviceId;
  next();
};

function generateDeviceId(req) {
  const userAgent = req.get('user-agent') || '';
  const ipAddress = req.ip || '';
  
  return crypto
    .createHash('sha256')
    .update(`${userAgent}:${ipAddress}:${Date.now()}`)
    .digest('hex');
}

export default (await startServer()) as unknown;

async function startServer() {
	const app = express();

	if (process.env.NODE_ENV === "production") {
		app.use(express.static(`${root}/dist/client`));
	} else {
		// Instantiate Vite's development server and integrate its middleware to our server.
		// ⚠️ We should instantiate it *only* in development. (It isn't needed in production
		// and would unnecessarily bloat our server in production.)
		const vite = await import("vite");
		const viteDevMiddleware = (
			await vite.createServer({
				root,
				server: { middlewareMode: true, hmr: { port: hmrPort } },
			})
		).middlewares;
		app.use(viteDevMiddleware);
	}
	app.use(cookieParser());
	app.use(deviceIdMiddleware);
	app.use(createMiddleware(dbMiddleware)());

	app.post("/_telefunc", createHandler(telefuncHandler)());

	/**
	 * Vike route
	 *
	 * @link {@see https://vike.dev}
	 **/
	app.all("*", createHandler(vikeHandler)());

	app.listen(port, () => {
		console.log(`Server listening on http://localhost:${port}`);
	});

	return app;
}
