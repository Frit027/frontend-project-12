[![Actions Status](https://github.com/Frit027/frontend-project-12/workflows/hexlet-check/badge.svg)](https://github.com/Frit027/frontend-project-12/actions)

# Web Chat

## Description
This repository presents the code for the frontend of the project.  
The website is a list of open chat rooms (channels) similar to Slack.
Users can register on the website and also create new channels visible to all.
Created channels can be deleted and renamed.  
Web chat is available at the [link](https://frontend-project-12-production-bf25.up.railway.app/).

## Dependencies
- Node.js v16.17.1 or later;
- server code: [Backend Chat](https://github.com/hexlet-components/project-js-chat-backend).

## Installation and launch
- clone the repository;
- inside the [frontend](frontend) directory run commands:
    - npm install.
- inside root:
  - npm install;
  - npm run build;
  - npm start.

## Technologies
- Main:
  - [ECMAScript 2021](https://www.w3schools.com/js/js_2021.asp)
  - [React](https://react.dev/) `[18.2.0]`
  - [Redux Toolkit](https://redux-toolkit.js.org/) `[1.9.3]`
- Interface:
  - [Bootstrap](https://getbootstrap.com/) `[5.0]`
- Auxiliary:
  - [i18next](https://www.i18next.com/) - a framework for easy text handling
  - [leo-profanity](https://github.com/jojoee/leo-profanity) - profanity filter
  - [Rollbar React](https://docs.rollbar.com/docs/react) - automatic error checking service
