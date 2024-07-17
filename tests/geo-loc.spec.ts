import { test, expect, chromium } from "@playwright/test";

const URL = `https://playwright-100-percent-coverage-of-a-simple-weather-app.vercel.app/`;

interface GeolocationResult {
	success: boolean;
	position?: GeolocationPosition; // Optional
	error?: string; // Optional
}

test("Geolocation request succeeds", async () => {
	let browser = await chromium.launch();
	let context = await browser.newContext({
		geolocation: { latitude: 50.857517, longitude: -0.130883 },
		permissions: ["geolocation"],
	});
	let page = await context.newPage();
	// Navigate to the page
	await page.goto(URL);

	// Create a promise that will resolve when geolocation is requested
	const geolocationResult = await page.evaluate(
		(): Promise<GeolocationResult> => {
			return new Promise((resolve) => {
				navigator.geolocation.getCurrentPosition(
					(position) => {
						// Success callback
						resolve({ success: true, position: position });
					},
					(error) => {
						// Error callback
						resolve({ success: false, error: error.message });
					}
				);
			});
		}
	);

	expect(geolocationResult.success).toBe(true);

	await context.close();
	await browser.close();
});
