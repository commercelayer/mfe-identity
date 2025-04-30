# Commerce Layer Identity

The Commerce Layer Identity micro frontend (React) provides you with an application, powered by Commerce Layer APIs, handling customer login and sign-up functionalities. You can fork this repository and deploy it to any hosting service or use it as a reference application to build your own. A hosted version is also available.

![mfe-identity-login-signup-forgetpwd-py](https://github.com/commercelayer/mfe-identity/assets/55532244/3c03aff6-f95e-44ad-be83-1b4a7da16c8a)

## What is Commerce Layer?

[Commerce Layer](https://commercelayer.io) is a multi-market commerce API and order management system that lets you add global shopping capabilities to any website, mobile app, chatbot, wearable, voice, or IoT device, with ease. Compose your stack with the best-of-breed tools you already mastered and love. Make any experience shoppable, anywhere, through a blazing-fast, enterprise-grade, and secure API.

## Table of contents

- [Getting started](#getting-started)
- [Hosted version](#hosted-version)
- [Private markets](#private-markets)
- [Custom reset password flow](#custom-reset-password-flow)
- [Contributors guide](#contributors-guide)
- [Running on Windows](#running-on-windows)
- [Help and support](#need-help)
- [License](#license)

---

## Getting started

1. Create your organization and get your credentials by following one of our [onboarding tutorials](https://docs.commercelayer.io/developers/welcome).

2. Configure the `selfHostedSlug` property in `/public/config.local.js` to match your organization slug (subdomain). If this file does not exist, create it using the following content:

```js
window.clAppConfig = {
  domain: "commercelayer.io",
  selfHostedSlug: "<your-org-slug>",
}
```

3. Deploy the forked repository to your preferred hosting service.

4. Create a [sales channel](https://docs.commercelayer.io/core/api-credentials#sales-channel) API credential within your organization and take note of the client ID.

5. Define a valid [scope](https://docs.commercelayer.io/core/authentication#authorization-scopes) as required by the sales channel [authentication](https://docs.commercelayer.io/core/authentication/client-credentials#sales-channel). It will be used to restrict the dataset of your application to a market, a stock location or a set of them.

6. Define a valid return URL that will be reached upon a successful login and/or sign-up procedure.

7. Open the identity app using the URL format: `<your-deployed-identity-url>?clientId=<your-client-id>&scope=<your-scope>&returnUrl=<your-return-url>`.

### Example

```text
https://identity.yourbrand.com?clientId=eyJhbGciOiJIUzUxMiJ9&scope=market:code:worldwide&returnUrl=https://shop.yourbrand.com/
```

## Hosted version

Any Commerce Layer account comes with a hosted version of the Identity application that is automatically enabled. You can customize it by adding your organization logo, favicon and primary color.

You can use the hosted version of the Identity application with the following URL format: `https://<your-organization-subdomain>.commercelayer.app/identity?clientId=<your-client-id>&scope=<your-scope>&returnUrl=<your-return-url>`

### Example

```text
https://yourbrand.commercelayer.app/identity?clientId=eyJhbGciOiJIUzUxMiJ9&scope=market:code:worldwide&returnUrl=https://shop.yourbrand.com/
```

## Private markets

When you associate a [customer group](https://docs.commercelayer.io/core/api-reference/customer_groups) with a market, that market becomes private and can be accessed only by customers belonging to the group. You can use private markets to handle scenarios where you need dedicated price lists, custom shipping methods, or other specific features available for a restricted pool of customers, such as managing B2B deals, B2C loyalty programs, private sales, and more.

To enable this kind of use cases, the `mfe-identity` application expects to have both required `scope` and optional `publicScope` parameters defined:
- `scope` - the market to be used for the login process (e.g. a private market).
- `publicScope` - the default scope used by the app to obtain the organization settings needed to customize the UI (name, logo, colors, etc.).

### Example

```text
https://yourbrand.commercelayer.app/identity?clientId=eyJhbGciOiJIUzUxMiJ9&scope=market:code:vip&publicScope=market:code:worldwide&returnUrl=https://shop.yourbrand.com/
```

## Custom reset password flow

In addition to the previously defined GET parameters required for correctly generating the hosted app link, you can optionally add the `resetPasswordUrl` one to enable a custom reset password link visible on the login form page. If that parameter is set a *Forgot password?* link will be shown on the right below the *Password* field.

### Example

```text
https://yourbrand.commercelayer.app/identity?clientId=eyJhbGciOiJIUzUxMiJ9&scope=market:code:worldwide&returnUrl=https://shop.yourbrand.com/&resetPasswordUrl=https://www.yourbrand.com/customer/reset-password
```

## Contributors guide

1. Fork [this repository](https://github.com/commercelayer/mfe-identity) (you can learn how to do this [here](https://help.github.com/articles/fork-a-repo)).

2. Clone the forked repository like so:

```sh
git clone https://github.com/<your username>/mfe-identity.git && cd mfe-identity
```

3. First, install dependencies and run the development server:

```sh
pnpm install
pnpm dev
```

4. (Optional) Set your environment with `.env.local` starting from `.env.local.sample`.

5. Open [http://localhost:5173](http://localhost:5173) with your browser to see the result. You can use the following format to open the login page: `http://localhost:5173/identity/?clientId=<your-client-id>&scope=<your-scope>&returnUrl=<your-return-url>`

6. Make your changes and create a pull request ([learn how to do this](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request)).

7. Someone will attend to your pull request and provide some feedback.

## Running on Windows

When working on Microsoft Windows, we suggest to use the PowerShell terminal or any alternative shell with the ability to run scripts as admin user.

This is required to install `pnpm` following the instruction [here](https://pnpm.io/installation#on-windows).

Once done, install globally the `touch-cli` package by running `pnpm add -g touch-cli` in order to successfully execute the `prepare` script.

## Need help?

- Join [Commerce Layer's Discord community](https://discord.gg/commercelayer).
- Ping us on [Bluesky](https://bsky.app/profile/commercelayer.io), [X (formerly Twitter)](https://x.com/commercelayer), or [LinkedIn](https://www.linkedin.com/company/commerce-layer).
- Is there a bug? Create an [issue](https://github.com/commercelayer/mfe-identity/issues) on this repository.

## License

This repository is published under the [MIT](LICENSE) license.
