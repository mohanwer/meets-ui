# meets-ui
A UI application for creating and registering for events (similar to meetup.com). For a sample version of this running application visit https://dev.assembleanywhere.com. I should have looked for a domain name before I started this project... meets.com wasn't available but assembleanywhere.com was. Sorry for the confusion with the url and project name :)

In order to run this application the env file must be configured. You'll need your own google maps api url. The remaining variables listed here can be used for development purposes:
 
| Variable | Value | Description |
| ----------- | ----------- | ----------- |
|REACT_APP_API_URL | https://api.dev.assembleanywhere.com/graphql | [Running development environment for API associated to this project.](https://github.com/mohanwer/meets-api)|
|REACT_APP_AUTH0_DOMAIN	| devprojecttracker.auth0.com | Auth0 domain |
|REACT_APP_AUTH0_CLIENT_ID | fggdQf3wqCtdf2ndXtAjM9Ztz9emd6Rg | Auth0 ClientId |
|REACT_APP_AUTH0_AUDIENCE |	https://devprojecttracker.auth0.com/api/v2/ | Auth0 Audience |

This application is written with the following technologies:
- Tailwind css
- Auth0
- Typescript
- apollo-boost

All api calls are written in the dataServices folder.
The components folder has all react components order by the page they are used on. The [security](https://github.com/mohanwer/meets-ui/tree/master/src/components/Security) folder has components that work with authentication to make certain components visible or invisible depending on if the user is authenticated.

To run the app:
### `npm start`
