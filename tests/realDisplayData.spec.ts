import { test, expect } from "@playwright/test";

test.use({
	geolocation: { latitude: 50.857517, longitude: -0.130883 },
	permissions: ["geolocation"],
});

// simple regex patterns to match any data returned from the API
test("Weather app with real API data", async ({ page }) => {
	await page.goto(
		"https://playwright-100-percent-coverage-of-a-simple-weather-app.vercel.app/"
	);

	await expect(page.locator(':text("Loading...")')).not.toBeVisible();
	await page.waitForTimeout(1000);

	const headingText = await page.getByTestId("main-heading").textContent();
	expect(headingText).toMatch(/The Weather App/);

	const locationText = await page.getByTestId("location").textContent();
	expect(locationText).toMatch(/[A-Za-z_'-]+/);

	const timeStamp = await page.getByTestId("weather-time").textContent();
	expect(timeStamp).toMatch(/.*/);
	// ^[A-Za-z]\s([1-9]|1[0-2]):([0-5][0-9])\s(am|pm)$

	const weatherCode = await page.getByTestId("weather-code").textContent();
	expect(weatherCode).toMatch(
		/^[A-Za-z]+(?: [A-Za-z]+)*(?:: [A-Za-z]+(?: [A-Za-z]+)*)?/
	);

	const temperature = await page.getByTestId("temperature").textContent();
	expect(temperature).toMatch(/-?\d+(\.\d+)?\s*°C/);

	const precipitation = await page.getByTestId("precipitation").textContent();
	expect(precipitation).toMatch(/^Precipitation:\s+\d+(\.\d)?\s+mm/);

	const humidity = await page.getByTestId("humidity").textContent();
	expect(humidity).toMatch(/^Humidity:\s\d{1,3}\s%/);

	const windSpeed = await page.getByTestId("wind-speed").textContent();
	expect(windSpeed).toMatch(/^Wind\sSpeed:\s\d+\.?\d+?\skm\/h/);
});
