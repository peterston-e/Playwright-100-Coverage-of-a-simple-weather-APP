# <p style="text-align: center;">Playwright 100% Coverage of a simple weather app</p>

E2E testing with Playwright: 100% coverage of a simple weather app. Intercepts HTTP requests, mocks data, UI verification and automated GitHub Actions integration.
This project was designed to help me learn som of the more complex aspect of Playwright that goes beyond simply assertions and makes use of the powerful data mocking and route capabilities.

### Playwright tests

1. Intercepts the HTTP requests with the `.route()` method to modify and mock the data.
2. Verifies the response from the actual API requests is OK.
3. Data Mocking: Replaces the response data with hard coded json object.
4. Mimics the asynchronous call to the browsers geolocation method.
5. UI Verification: Assert that elements are correctly displayed on a deployed site.

## Github Actions integration

1. YML file added to run tests on push to main.
2. Further steps can be taken on your github account to create rules to only allow merging if all tests pass.

### Weather app

1. Requests permission to use the Geolocation API. `navigator.geolocation.getCurrentPosition()`
2. Makes a API request for location name to a reverse geo API using the current position.
3. Makes a second API request to Meteo weather for current condition also using the geolocation data.
4. Displays the data collected to show current weather in your locality.

---

### <p style="text-align: center;">Tech Stack</p>

<div align="center" >
	<code style="margin:0 20px;"><img width="50" src="https://github.com/marwin1991/profile-technology-icons/assets/25181517/37cb517e-d059-4cc0-8124-1a72b663167c" alt="Playwright" title="Playwright"/></code>
	<code style="margin:0 20px;"><img width="50" src="https://user-images.githubusercontent.com/25181517/183890598-19a0ac2d-e88a-4005-a8df-1ee36782fde1.png" alt="TypeScript" title="TypeScript"/></code>
	<code style="margin:0 20px;"><img width="50" src="https://user-images.githubusercontent.com/25181517/183897015-94a058a6-b86e-4e42-a37f-bf92061753e5.png" alt="React" title="React"/></code>
    <code style="margin:0 20px;"><img width="50" src="https://user-images.githubusercontent.com/25181517/202896760-337261ed-ee92-4979-84c4-d4b829c7355d.png" alt="Tailwind CSS" title="Tailwind CSS"/></code>
	<code style="margin:0 20px;"><img width="50" src="https://github.com/marwin1991/profile-technology-icons/assets/136815194/5f8c622c-c217-4649-b0a9-7e0ee24bd704" alt="Next.js" title="Next.js"/></code>
</div>

<p style="text-align: center;"><span style="margin:50px 0px">  Playwright,</span> <span style="margin:50px 0px">  TypeScript,</span> <span style="margin:50px 0px">  React,</span> <span style="margin:50px 0px">  Tailwind CSS,</span><span style="margin:50px 0px">  Next.js</span></p>
<span style="margin:50px 0px"></span>

## Getting Started

> 👍 This app will request your current position to show the weather.
> No data is collected or used. This is purely for demonstration purposes.

Install the dependencies:

```bash or zsh
npm install
```

Run the development server to see the UI:

```bash or zsh
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Run all tests:

```bash or zsh
npx playwright test
```

## Contributing

If you would like to contribute to the UI in any way please make a pull request and I will consider the changes.
The app is using Tailwind CSS and you can get started modifying the `src/app/page.tsx` classes.

To learn more about Playwright, Tailwind, Next.js and React, take a look at the following resources:

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Tailwind Documentation](https://tailwindcss.com/docs/installation)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/reference/react)
- [Typescript Documentation](https://www.typescriptlang.org/docs/)

### Rules

- Any changes have to pass the playwright tests.
- You can alter the tests but only if you make significant changes to the UI.

## Authors

Contributors names and contact info will be added to this list.

- **Primary Contributor:** Peter Faretra [Linkedin](https://www.linkedin.com/in/peter-faretra-3661a32a6/)

## Acknowledgments

- [QA Wolf](https://github.com/qawolf)
- [School of Code](https://github.com/SchoolOfCode)
