
#  Digital Paper Edit - Server API

## Current status

The client and API was initially developed to be portable to any platform - i.e local, web, cloud provider, and Electron.
We are currently developing and maintaining a **[firebase version](https://github.com/bbc/digital-paper-edit-firebase)** that merged the functionalities of the [client](https://github.com/bbc/digital-paper-edit-client/) and [API](https://github.com/bbc/digital-paper-edit-api/). The BBC is **not actively working on digital-paper-edit-client and digital-paper-edit-api**. This is because we are prioritising getting Digital Paper Edit in front of our journalists. For the full list of active/inactive DPE repos, see [here](https://github.com/bbc/digital-paper-edit-client/#active).

A fork of the client and API is still being developed in the open, in a **[separate fork](https://github.com/pietrop/digital-paper-edit-api)**, thanks to @pietrop. 

We don't want the opensource collaboration to stop, so we will be pulling in changes from the forks. If there's a valuable feature that we haven't yet implemented from the fork, please open an issue in **[this repo](https://github.com/bbc/digital-paper-edit-firebase)** or get in touch with us!

### Collaborating across forks

We will look at the changes in the [fork](https://github.com/pietrop/digital-paper-edit-api) and manually add them to our [firebase version](https://github.com/bbc/digital-paper-edit-firebase).

When manually adding changes to the changes from a fork - there are challenges of pulling in dependencies, such as:

```javascript
[
  ("@bbc/aes31-adl-composer": "^1.0.1"),
  ("@bbc/digital-paper-edit-react-components": "^1.3.2"),
  ("@bbc/fcpx-xml-composer": "^1.0.0"),
  ("@bbc/react-transcript-editor": "^1.4.0")
];
```

These dependencies (non-exhaustive) they might've been forked also. In this case, this is a matter of updating the BBC's version with the newest changes from the dependency's forks and making sure everything works together.

For understanding the approach see [this PR](https://github.com/bbc/digital-paper-edit-client/pull/94).

---

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

## Usage - development

```
npm run start:dev
```
 
Server API is listening on [`http://localhost:7080`](http://localhost:7080)

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
