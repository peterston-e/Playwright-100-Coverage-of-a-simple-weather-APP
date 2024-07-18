import { test, expect, chromium } from "@playwright/test";
import { mockWeatherApiRoute } from "./routeHandlers";

test("Weather app with mocked API data", async () => {
	const browser = await chromium.launch({ headless: false, slowMo: 1000 });
	const context = await browser.newContext({
		geolocation: { latitude: 51.501536, longitude: -0.141488 },
		permissions: ["geolocation"],
	});
	const page = await context.newPage();

	await page.route("**/api.open-meteo.com/**", mockWeatherApiRoute);

	await page.goto(
		"https://playwright-100-percent-coverage-of-a-simple-weather-app.vercel.app/"
	);
	// waits for page to load
	await expect(page.locator(':text("Loading...")')).not.toBeVisible();

	// Close the browser at the end of the test
	await browser.close();
	// await page.pause();
});
