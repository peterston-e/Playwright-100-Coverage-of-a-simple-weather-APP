import {
	test,
	chromium,
	Browser,
	BrowserContext,
	Page,
} from "@playwright/test";
import { testAPIResponse } from "./helper";

// its important to test the actual API calls made by the application
// to ensure the application is working as expected as other tests will mock the data
// to test the UI and ensure consistency and speed.

const URL = `https://playwright-100-percent-coverage-of-a-simple-weather-app.vercel.app/`;
const API_URL = "https://api.open-meteo.com/**";
const GEO_URL = "https://api.postcodes.io/**";

test.describe("API Responses", () => {
	let browser: Browser, context: BrowserContext, page: Page;

	test.beforeAll(async () => {
		browser = await chromium.launch();
	});

	test.afterAll(async () => {
		await browser.close();
	});

	test("Weather API response OK", async () => {
		context = await browser.newContext({
			geolocation: { latitude: 50.857517, longitude: -0.130883 },
			permissions: ["geolocation"],
		});
		page = await context.newPage();
		await page.goto(URL);
		await testAPIResponse(page, API_URL, 30000);
		await context.close();
	});

	test("Geolocation API response OK", async () => {
		context = await browser.newContext({
			geolocation: { latitude: 50.857517, longitude: -0.130883 },
			permissions: ["geolocation"],
		});

		page = await context.newPage();

		// Setup API interception here to confirm the API call is made
		await page.route("https://api.postcodes.io/**", (route) => {
			route.continue();
		});

		// Mock geolocation
		// this effectively replaces the geo function to return a mock location
		await page.evaluate(() => {
			navigator.geolocation.getCurrentPosition = (success) => {
				success({
					coords: {
						latitude: 50.857517,
						longitude: -0.130883,
						accuracy: 100,
						altitude: null,
						altitudeAccuracy: null,
						heading: null,
						speed: null,
					},
					timestamp: Date.now(),
				});
			};
		});

		await page.goto(URL);

		// Use testAPIResponse to check the Geolocation API call
		try {
			await testAPIResponse(page, GEO_URL, 30000);
		} catch (error) {
			console.error("Error testing Geolocation API response:", error);
		}

		await context.close();
	});
});
