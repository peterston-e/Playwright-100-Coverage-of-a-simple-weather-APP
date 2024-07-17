// utils.ts

export const weatherCodes: { [key: number]: string } = {
	0: "Clear sky",
	1: "Mainly clear",
	2: "Partly cloudy",
	3: "Overcast",
	45: "Fog",
	48: "Fog",
	51: "Drizzle: Light",
	52: "Drizzle: Moderate",
	53: "Drizzle: Dense intensity",
	56: "Freezing Drizzle: Light",
	57: "Freezing Drizzle: Dense intensity",
	61: "Rain: Slight",
	63: "Rain: Moderate",
	65: "Rain: Heavy intensity",
	66: "Freezing Rain: Light",
	67: "Freezing Rain: Heavy intensity",
	71: "Snow fall: Slight",
	73: "Snow fall: Moderate",
	75: "Snow fall: Heavy intensity",
	77: "Snow grains",
	80: "Rain showers: Slight",
	81: "Rain showers: Moderate",
	82: "Rain showers: Violent",
	85: "Snow showers: Slight",
	86: "Snow showers: Heavy",
	95: "Thunderstorm: Slight or moderate",
	96: "Thunderstorm with slight hail",
	99: "Thunderstorm with heavy hail",
};

export function getPosition(): Promise<GeolocationPosition> {
	return new Promise((res, rej) => {
		navigator.geolocation.getCurrentPosition(res, rej);
	});
}

export function updateApiEndpoint(lat: string, long: string): string {
	return `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,weather_code,wind_speed_10m,wind_direction_10m,wind_gusts_10m&hourly=uv_index&daily=weather_code,uv_index_max&timezone=GMT`;
}

export function formatDate(timeString: string): string {
	const date = new Date(timeString);
	const options: Intl.DateTimeFormatOptions = {
		weekday: "long",
		hour: "numeric",
		minute: "numeric",
		hourCycle: "h12",
	};
	return date.toLocaleString("en-GB", options);
}
