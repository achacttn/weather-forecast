# Weather Forecast App

## Introduction

- A demo application for checking weather at a location!

- [Click here for link](weather-forecast-01.netlify.app)

## Usage

- Enter location by name OR latitude/longitude coordinates OR geolocation

- If there are 0 search results, refresh the page and try another search term

- If there are multiple search results, choose from the available locations

## Notes & Improvements

- CICD
    * Remote repository hosted on [Github](https://github.com/achacttn/weather-forecast), build and staging on [Netlify](https://www.netlify.com/)
    * Process can be improved by merging feature branches into dev branch, and automated builds from dev branch only (i.e. prevent pushing straight into production)

- Due to cross origin requests being blocked, lambda functions were created as a proxy request to retrieve locations and weather data from the metaweather API
    * [Location search](https://github.com/achacttn/weather-forecast-lambda-locationSearch)
    * [Weather search](https://github.com/achacttn/weather-forecast-lambda-woeid)

- Cleaner code
    * `UserPrompt.tsx` could be split into smaller components
    * Refactor (particularly in UserPrompt.tsx) for example requests could be wrapped in a function to take parameters (for reduced repetition)

- UX
    * Error handling could be clearer to the user, i.e. if inputs are invalid, error messages can be shown to user for corrections
    * Navigation to location search page if user wants to find weather for a different location, without having to refresh the page

- Test (not implemented due to time constraints)
    * Implement automated tests for both components, as well as end-to-end

### Online resources used

- [TypeScript docs](https://www.typescriptlang.org/docs/handbook/interfaces.html)

- [React docs](https://reactjs.org/docs/hooks-reference.html)

- [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)

### Attributions

- [Metaweather API](https://www.metaweather.com/api/)

- [Github](https://github.com)

- [Netlify](https://www.netlify.com)
