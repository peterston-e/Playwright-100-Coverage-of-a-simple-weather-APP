import { Route } from "@playwright/test";

export const mockWeatherApiRoute = (route: Route) => {
	route
		.fulfill({
			status: 200,
			contentType: "application/json",
			body: JSON.stringify({
				current_units: {
					time: "iso8601",
					temperature_2m: "°C",
					relative_humidity_2m: "%",
					apparent_temperature: "°C",
					precipitation: "mm",
					rain: "mm",
					weather_code: "wmo code",
					wind_speed_10m: "km/h",
					wind_direction_10m: "°",
					wind_gusts_10m: "km/h",
				},
				current: {
					time: "2013-01-11T08:30",
					temperature_2m: 180.6,
					relative_humidity_2m: 50,
					apparent_temperature: 21.2,
					precipitation: 0.0,
					rain: 0.0,
					weather_code: 0,
					wind_speed_10m: 5.1,
					wind_direction_10m: 140,
					wind_gusts_10m: 5.3,
				},
			}),
		})
		.catch((error: Error) => console.error("Error on route", error));
};
