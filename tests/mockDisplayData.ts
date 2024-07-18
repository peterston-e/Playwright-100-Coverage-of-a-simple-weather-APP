import { test, expect, chromium } from "@playwright/test";
import { mockWeatherApiRoute } from "./routeHandlers";

test("Weather app with mocked API data", async () => {
	const browser = await chromium.launch();
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
	await page.waitForTimeout(1000);

	expect(page.getByTestId("main-heading")).toContainText("The Weather App");
	expect(page.getByTestId("location")).toContainText("St James's");
	expect(page.getByTestId("weather-time")).toContainText("Friday 8:30 am");
	expect(page.getByTestId("weather-code")).toContainText("Clear sky");
	expect(page.getByTestId("temperature")).toContainText("20.6  ℃");
	expect(page.getByTestId("precipitation")).toContainText(
		"Precipitation: 0 mm"
	);
	expect(page.getByTestId("humidity")).toContainText("Humidity: 50 %");
	const windSpeedText = await page.getByTestId("wind-speed").textContent();
	expect(windSpeedText).toMatch(/Wind Speed: \d+(\.\d+)? km\/h/);

	// await page.pause();
	// Close the browser at the end of the test
	await browser.close();
});
