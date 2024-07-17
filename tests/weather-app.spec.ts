import { test, expect, chromium } from "@playwright/test";

const URL =
	"https://playwright-100-percent-coverage-of-a-simple-weather-app.vercel.app/";

test("Weather API response OK", async () => {
	const browser = await chromium.launch();
	const context = await browser.newContext({
		geolocation: { latitude: 50.857517, longitude: -0.130883 },
		permissions: ["geolocation"],
	});
	const page = await context.newPage();

	let apiCalled = false;
	let apiResponseStatus = null;

	await page.route("https://api.open-meteo.com/**", async (route) => {
		// Intercept the route
		apiCalled = true;

		// Continue the route
		const response = await route.fetch();
		apiResponseStatus = response.status();
		await route.continue();
	});

	await page.goto(URL);

	try {
		await page.waitForResponse("https://api.open-meteo.com/**", {
			timeout: 30000,
		});
	} catch (error) {
		console.error("API call not detected within timeout period");
	}

	// Check if the API was called
	expect(apiCalled).toBeTruthy();
	expect(apiResponseStatus).toBe(200);

	await context.close();
	await browser.close();
});
