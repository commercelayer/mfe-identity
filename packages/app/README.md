# Commerce Layer Identity

The Commerce Layer Identity micro frontend (React) provides you with an application, powered by Commerce Layer APIs, handling customer login and sign-up functionalities. You can fork this repository and deploy it to any hosting service or use it as a reference application to build your own. A hosted version is also available.

![mfe-identity-login-signup-py](https://github.com/commercelayer/mfe-identity/assets/97170183/5a0ca972-5241-4e16-af33-280d84857dc7)

## What is Commerce Layer?

[Commerce Layer](https://commercelayer.io) is a multi-market commerce API and order management system that lets you add global shopping capabilities to any website, mobile app, chatbot, wearable, voice, or IoT device, with ease. Compose your stack with the best-of-breed tools you already mastered and love. Make any experience shoppable, anywhere, through a blazing-fast, enterprise-grade, and secure API.

## Table of contents

- [Getting started](#getting-started)
- [Hosted version](#hosted-version)
- [Contributors guide](#contributors-guide)
- [Help and support](#need-help)
- [License](#license)

---

## Getting started

1. Create your organization and get your credentials by following one of our [onboarding tutorials](https://docs.commercelayer.io/developers/welcome).

2. Configure the `selfHostedSlug` property in `/public/config.local.js` to match your organization slug (subdomain). If this file does not exist, create it using the following content:

```
window.clAppConfig = {
  domain: "commercelayer.io",
  selfHostedSlug: "<your-org-slug>",
}
```

3. Deploy the forked repository to your preferred hosting service or host it yourself. You can deploy with one click below:

[<img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify" height="35">](https://app.netlify.com/start/deploy?repository=https://github.com/commercelayer/mfe-identity) [<img src="https://vercel.com/button" alt="Deploy to Vercel" height="35">](https://vercel.com/new/clone?repository-url=https://github.com/commercelayer/mfe-identity) [<img src="https://www.herokucdn.com/deploy/button.svg" alt="Deploy to Heroku" height="35">](https://heroku.com/deploy?template=https://github.com/commercelayer/mfe-identity) [<img src="https://www.deploytodo.com/do-btn-blue.svg" alt="Deploy to Digital Ocean" height="35">](https://cloud.digitalocean.com/apps/new?repo=https://github.com/commercelayer/mfe-identity/tree/master)

4. Create a [sales channel](https://docs.commercelayer.io/core/applications#sales-channel) application inside your organization and take note of its client ID.

5. Setup and/or identify a [scope](https://docs.commercelayer.io/core/authentication#authorization-scopes) containing a market [e.g. `market:1234`] as required by the sales channel [authentication](https://docs.commercelayer.io/core/authentication/client-credentials#sales-channel).

6. Define a valid return URL that will be reached upon a successful login and/or sign-up procedure.

7. Open the identity app using the URL format: `<your-deployed-identity-url>?clientId=<your-client-id>&scope=<your-scope>&returnUrl=<your-return-url>`.

### Example

`https://identity.yourbrand.com?clientId=eyJhbGciOiJIUzUxMiJ9&scope=market:1234&returnUrl=https://shop.yourbrand.com/`

## Hosted version

Any Commerce Layer account comes with a hosted version of the Identity application that is automatically enabled. You can customize it by adding your organization logo, favicon and primary color.

You can use the hosted version of the Identity application with the following URL format: `https://<your-organization-subdomain>.commercelayer.app/identity?clientId=<your-client-id>&scope=<your-scope>&returnUrl=<your-return-url>`

### Example

`https://yourbrand.commercelayer.app/identity?clientId=eyJhbGciOiJIUzUxMiJ9&scope=market:1234&returnUrl=https://shop.yourbrand.com/`

## Contributors guide

1. Fork [this repository](https://github.com/commercelayer/mfe-identity) (you can learn how to do this [here](https://help.github.com/articles/fork-a-repo)).

2. Clone the forked repository like so:

```bash
git clone https://github.com/<your username>/mfe-identity.git && cd mfe-identity
```

3. First, install dependencies and run the development server:

```
pnpm install
pnpm dev
```

4. (Optional) Set your environment with `.env.local` starting from `.env.local.sample`.

5. Open [http://localhost:5174](http://localhost:5174) with your browser to see the result. You can use the following format to open the login page: `http://localhost:5174/identity/?clientId=<your-client-id>&scope=<your-scope>&returnUrl=<your-return-url>`

6. Make your changes and create a pull request ([learn how to do this](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request)).

7. Someone will attend to your pull request and provide some feedback.

## Need help?

1. Join [Commerce Layer's Slack community](https://slack.commercelayer.app).

2. Create an [issue](https://github.com/commercelayer/mfe-identity/issues) in this repository.

3. Ping us [on Twitter](https://twitter.com/commercelayer).

## License

This repository is published under the [MIT](LICENSE) license.
