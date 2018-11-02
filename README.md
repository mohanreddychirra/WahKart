# WahKart is an Online eCommerce store with ReactJS

Utilized: React.js, Redux.js, Node.js, Express.js, Webpack, Babel, SCSS, PostgreSQL, JSX, Github


### Codebase Summary

This is a node application with the frontend and backend both managed by separate servers.

The frontend server was setup using `webpack-dev-server`module while the server running the API was setup using `node express server`.

### Folder Structure

<br>

> - `public` Folder

This hold files accessible by anyone through the URL, contents of this folder as at present includes `images` and the `index.html` file.

> - `server` Folder

This folder contains API related files and code, this varies from database configuration file,model files, migration files, seeder files, controllers for API endpoints and middlewares to perform operations actions such as verifying request token.

> - `src` Folder

This contains the whole code that are bundled together by webpack into a single `bundle.js` file, to be run in the browser, by including it as a script tag in `public/index.html` file.

Files in this folder includes stylesheets, react components in JSX, reducers, actions and helpers file.

> - Others

Other files at the root path of the project folder are mostly configuration files for our `bundler (webpack)`, `transpiler (babel)`, `node package management (package.json)`.
