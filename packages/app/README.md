# Commerce Layer Identity

The Commerce Layer Identity micro frontend application (React) provides you an application with customer login and sign-up capabilities powered by Commerce Layer APIs. You can fork this repository and deploy it to any hosting service or use it as a reference application to build your own. A hosted version is also available.

## What is Commerce Layer?

[Commerce Layer](https://commercelayer.io) is a multi-market commerce API and order management system that lets you add global shopping capabilities to any website, mobile app, chatbot, wearable, voice, or IoT device, with ease. Compose your stack with the best-of-breed tools you already mastered and love. Make any experience shoppable, anywhere, through a blazing-fast, enterprise-grade, and secure API.

## Table of contents

- [Getting started](#getting-started)
- [Hosted version](#hosted-version)
- [Embedding the cart](#embedding-the-cart)
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

4. Create a `Sales channel` application inside your organization by leveraging our [documentation](https://docs.commercelayer.io/core/applications) and take note of its `client Id` credential.

5. Setup and/or identify a `scope` containing a market [eg. market:123] as required by `Sales channel` authentication. See [documentation](https://docs.commercelayer.io/core/authentication#putting-a-market-in-scope).

6. Define a valid `return Url` that will be reached upon a successful login and/or sign-up procedure.

7. Open the identity app using the URL format: `<your-deployed-identity-url>?clientId=<your-client-it>&scope=<your-scope>&returnUrl=<your-return-url>`.

### Example

`https://identity.yourbrand.com?clientId=eyJhbGciOiJIUzUxMiJ9&scope=market:123&returnUrl=https://shop.yourbrand.com/`

## Hosted version

Any Commerce Layer account comes with a hosted version of the Identity application that is automatically enabled. You can customize it by adding your organization logo, favicon and primary color.

You can use the hosted version of the Identity application with the following URL format: `https://<your-organization-subdomain>.commercelayer.app/identity?clientId=<your-client-it>&scope=<your-scope>&returnUrl=<your-return-url>`

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

5. Open [http://localhost:5174](http://localhost:5174) with your browser to see the result. You can use the following format to open the cart: `http://localhost:5174/identity/?clientId=<your-client-it>&scope=<your-scope>&returnUrl=<your-return-url>`

6. Make your changes and create a pull request ([learn how to do this](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request)).

7. Someone will attend to your pull request and provide some feedback.

## Need help?

1. Join [Commerce Layer's Slack community](https://slack.commercelayer.app).

2. Create an [issue](https://github.com/commercelayer/mfe-identity/issues) in this repository.

3. Ping us [on Twitter](https://twitter.com/commercelayer).

## License

This repository is published under the [MIT](LICENSE) license.