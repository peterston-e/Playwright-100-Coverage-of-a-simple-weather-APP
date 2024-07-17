import { test, expect, chromium, Page } from "@playwright/test";

export async function testAPIResponse(
	page: Page,
	apiURL: string,
	timeout: number
) {
	let apiCalled = false;
	let apiResponseStatus = null;

	await page.route(apiURL, async (route) => {
		// Intercept the route
		apiCalled = true;

		// Continue the route
		const response = await route.fetch();
		apiResponseStatus = response.status();
		await route.continue();
	});

	try {
		await page.waitForResponse("https://api.open-meteo.com/**", {
			timeout: timeout,
		});
	} catch (error) {
		console.error(`API call to ${apiURL} not detected within timeout period`);
	}

	// Check if the API was called
	expect(apiCalled).toBeTruthy();
	expect(apiResponseStatus).toBe(200);
}
