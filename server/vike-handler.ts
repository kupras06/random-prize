/// <reference lib="webworker" />
import { renderPage } from "vike/server";
// TODO: stop using universal-middleware and directly integrate server middlewares instead. (Bati generates boilerplates that use universal-middleware https://github.com/magne4000/universal-middleware to make Bati's internal logic easier. This is temporary and will be removed soon.)
import type { Get, UniversalHandler } from "@universal-middleware/core";
const deviceIdMiddleware = (req) => {
  const cookieName = 'device_id';
	const cookieStrings = req.headers.get('cookie').split(";")
  const deviceId = cookieStrings.find(cookie => cookie.trim().startsWith(`${cookieName}=`))?.split('=')[1] 
	console.log('Context',{deviceId})
	return deviceId
};

function generateDeviceId(req) {
  const userAgent = req.headers.get('user-agent') || '';
  const ipAddress = req.ip || '';
  
  return crypto
    .createHash('sha256')
    .update(`${userAgent}:${ipAddress}:${Date.now()}`)
    .digest('hex');
}

export const vikeHandler: Get<[], UniversalHandler> =
	() => async (request, context, runtime) => {
		const pageContextInit = {
			...context,
			...runtime,
			urlOriginal: request.url,
		deviceId:deviceIdMiddleware(request),
			headersOriginal: request.headers,
		};
		const pageContext = await renderPage(pageContextInit);
		const response = pageContext.httpResponse;

		const { readable, writable } = new TransformStream();
		response.pipe(writable);

		return new Response(readable, {
			status: response.statusCode,
			headers: response.headers,
		});
	};
