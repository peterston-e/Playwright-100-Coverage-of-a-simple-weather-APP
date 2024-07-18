"use client";
import React, { useState, useEffect } from "react";
import {
	weatherCodes,
	getPosition,
	updateApiEndpoint,
	formatDate,
} from "./utils";

interface WeatherData {
	current: {
		time: string;
		temperature_2m: number;
		precipitation: number;
		relative_humidity_2m: number;
		wind_speed_10m: number;
		weather_code: number;
	};
}

const Weather: React.FC = () => {
	const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
	const [location, setLocation] = useState<string>("");

	useEffect(() => {
		const fetchWeather = async () => {
			try {
				const position = await getPosition();
				const lat = position.coords.latitude.toFixed(4);
				const long = position.coords.longitude.toFixed(4);

				const apiEndpoint = updateApiEndpoint(lat, long);

				const geoCodeApiEndpoint = `https://api.postcodes.io/postcodes?lon=${long.slice(
					0,
					-1
				)}&lat=${lat.slice(0, -1)}`;
				const reverseGeoResponse = await fetch(geoCodeApiEndpoint);
				if (!reverseGeoResponse.ok) {
					console.error(reverseGeoResponse.status);
					console.error(await reverseGeoResponse.text());
					return;
				}

				const geoData = await reverseGeoResponse.json();
				const exactLocation = geoData.result[0].admin_ward;
				setLocation(exactLocation);

				const response = await fetch(apiEndpoint);
				if (!response.ok) {
					console.error(response.status);
					console.error(await response.text());
					return;
				}

				const data = await response.json();
				setWeatherData(data);
			} catch (error) {
				console.error(error);
			}
		};

		fetchWeather();
	}, []);

	if (!weatherData) return <div>Loading...</div>;

	return (
		<div className="min-h-screen w-full flex items-center justify-center">
			<div className="flex flex-col gap-1 p-4 max-w-md w-full">
				<h1 data-testid="main-heading" className="text-4xl pt-3 pb-3">
					The Weather App
				</h1>
				<h2 data-testid="location" className="title text-2xl">
					{location}
				</h2>
				<p data-testid="weather-time" className="time">
					{formatDate(weatherData.current.time)}
				</p>
				<p data-testid="weather-code" className="weather-code mb-10">
					{weatherCodes[weatherData.current.weather_code]}
				</p>
				<p data-testid="temperature" className="degreesC text-7xl mb-10">
					{weatherData.current.temperature_2m} ℃
				</p>

				<p data-testid="precipitation" className="precipitation-percent">
					Precipitation: {weatherData.current.precipitation} mm
				</p>
				<p data-testid="humidity" className="humidity-percent">
					Humidity: {weatherData.current.relative_humidity_2m} %
				</p>
				<p data-testid="wind-speed" className="wind-speed">
					Wind Speed: {weatherData.current.wind_speed_10m} km/h
				</p>
			</div>
		</div>
	);
};

export default Weather;
