
#  Digital Paper Edit - Server API

---> _Work in progress_  <--

<!-- _One liner + link to confluence page_
_Screenshot of UI - optional_ -->

 
[See here for overall project architecture info](https://github.com/bbc/digital-paper-edit-client#project-architecture)

## Setup
<!-- _stack - optional_
_How to build and run the code/app_ -->

 
```
git clone git@github.com:bbc/digital-paper-edit-api.git
```

```
cd digital-paper-edit-api
```

Optional step to setup [nvm](https://github.com/nvm-sh/nvm) to use node version 10, otherwise just use node version 10
```
nvm use || nvm install
```

in root of project
```
npm install
```

alternatively for production is also on [npm](https://www.npmjs.com/package/@bbc/digital-paper-edit-api)

.env file should include:

```
AWS_REGION=
AWS_ACCOUNT=
SNS_TOPIC=
AWS_KEY_ID=
AWS_SECRET_KEY=

NODE_ENV=
PORT=

LOG_NAME=
LOG_LEVEL=
LOG_FILE=
LOG_ERROR=

DB_USER=
DB_HOST=
DB_NAME=
DB_PASSWORD=
DB_PORT=
```

## Usage - development

```
npm run start:dev
```
 
Server API is listening on [`http://localhost:7080`](http://localhost:7080)

### Database

Before connecting to the RDS, you must SSH into a Cosmos component that has been granted permission to communicate with the RDS in its policy. Run:

```
ssh -f -L [port]:[rds name]:[port] [ssh] -N
```
#### Migrations
First, make sure you've installed Knex.js globally:

```
npm install knex -g
```

Then run:
```
knex migrate:latest
```

To roll back:
```
knex migrate:rollback
```

#### Seeding
After running the migration, populate the database with test data using:

```
knex seed:run
```

## Usage - production


The project is also publicly available in the npm registry [`@bbc/digital-paper-edit-api`](https://www.npmjs.com/package/@bbc/digital-paper-edit-api)

 you can add it to your project
```
npm install @bbc/digital-paper-edit-api
```

and eg in an express server you can serve the static build as follows

```
require('@bbc/digital-paper-edit-api');
```

See notes in [infrastructure repository](https://github.com/bbc/digital-paper-edit-infrastructure) on [Importing JS modules without specifying export](https://github.com/bbc/digital-paper-edit-infrastructure/blob/master/docs/notes/2019-05-24-imports-without-exports.md) for more details on this work.

## System Architecture
<!-- _High level overview of system architecture_ -->

 Express web server API

## Development env
 <!-- _How to run the development environment_

_Coding style convention ref optional, eg which linter to use_

_Linting, github pre-push hook - optional_ -->

- [ ] npm > `6.1.0`
- [ ] node v 10 - [lts/dubnium](https://scotch.io/tutorials/whats-new-in-node-10-dubnium)
- [ ] see [`.eslintrc`](./.eslintrc) in the various packages for linting rules

Node version is set in node version manager [`.nvmrc`](https://github.com/creationix/nvm#nvmrc)
 

## Build
<!-- _How to run build_ -->

_TBC_
 

## Tests
<!-- _How to carry out tests_ -->

```
npm test:watch
```
 

## Deployment
<!-- _How to deploy the code/app into test/staging/production_ -->

_TBC_

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) guidelines and [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) guidelines.

## Licence
<!-- mention MIT Licence -->
See [LICENCE](./LICENCE.md)

## Legal Disclaimer

_Despite using React and DraftJs, the BBC is not promoting any Facebook products or other commercial interest._