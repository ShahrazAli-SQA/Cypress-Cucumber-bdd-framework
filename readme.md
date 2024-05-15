# DAO PROP TECH

This is a Cypress test automation framework for the **DAO PROP TECH** web application. It allows you to automate functional tests for the application

## Table of Contents
[Prerequisites](#prerequisites)

[Installation](#installation) 

[Project Structure](#project-structure)

[Test Configuration](#test-configuration)


## Prerequisites
Before you begin, ensure you have met the following requirements:

- [Node.js](https://nodejs.org/) installed

- [Git]((https://git-scm.com/)) installed

## Installation
To get started with this framework, follow these steps:
- Clone this repository to your local machine

```sh
$ git clone https://shahrazali@bitbucket.org/daoproptech/dao-ui-automation.git
```
- Navigate to the project directory

```
cd dao-ui-automation
``` 
- Install the required Node.js packages
```
npm install
```
## Project Structure

```
├── README.md
├── cypress.config.js
|__ cypress
      |__ integration
          |__ admin_portal
          |__ affiliate_portal
          |__ investor_portal
      |__ fixtures
      |__ support
```


- `README.md` this file
- `cypress.config.js` cypress framework configuration for dao prop tech
- `cypress` directory containing cypress tests and all supporting components
- `admin_portal` directory containing all admin portal scenarios
- `affiliate_portal` directory containing all affiliate portal scenarios
- `investor_portal` directory containing all investor portal scenarios
- `fixtures` directory containing all test data files

 ## Test Configuration
 The test configuration can be found in the ``cypress.config.js`` file. You can customize settings such as the ``base URL``, ``browser``, or ``test environment`` in this file.

## Running Tests

You can run the Cypress tests using the following command
```
 npx cypress open
 ```
 This will open the Cypress Test Runner, allowing you to select and run specific test files or suites.

 You can run all feature files in headless mode
 ```
 npm run all:feature
 ``````
 All other scripts to run different files are located in package.json file under scripts list

 ## Writing Tests
 All test scripts are located in the ``cypress/integration`` directory. You can