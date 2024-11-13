# <img src="https://platform.labs.text.com/console/favicon.ico" widht="24px" height="24px" /> Text Platform | App - Next.js SaaS boilerplate

This template bootstraps CRM-like [Text Platform App](https://platform.text.com/console/apps) with a predefined configuration and code responsible for:

- integration with [LiveChat Widgets](https://platform.text.com/docs/extending-agent-app)
- managing and persisting LiveChat customers using database

## ℹ️ Content

The template is built using:

- [Next.js](https://nextjs.org/) - web application framework
- [Text | Design System](https://www.npmjs.com/package/@livechat/design-system-react-components) - shared components library
- [Text Platform | Developer CLI](https://www.npmjs.com/package/@livechat/developer-cli) - terminal tool for managing app like in [Developer Console](https://platform.text.com/console)
- [Text Platform | Developer UI](https://www.npmjs.com/package/@livechat/developer-ui-react) - library that provides useful wrappers for:
  - Text Platform App ([@developer-sdk](https://www.npmjs.com/package/@livechat/developer-sdk#developer-app))
  - Text Products widgets ([@agent-app-sdk](https://www.npmjs.com/package/@livechat/agent-app-sdk), [@helpdesk-sdk](https://www.npmjs.com/package/@livechat/helpdesk-sdk))

The template consists of:

- [layout](app/layout.tsx) that wraps all app pages and utilizes [Text Platform | Developer UI](https://www.npmjs.com/package/@livechat/developer-ui-react#-usage) to provide cross-app access to [Text Platform App](https://www.npmjs.com/package/@livechat/developer-sdk#developer-app) instance with all of built-in features like [reporting](https://www.npmjs.com/package/@livechat/developer-sdk#reporting)
- [page](<app/(products)/livechat/(widgets)/details/page.tsx>) for [LiveChat Details](https://platform.text.com/docs/extending-agent-app#details-section) widget - server component that loads current customer from database (if was already saved)
  - [widget](<app/(products)/livechat/(widgets)/details/widget.tsx>) - client component that presents current customer details and triggers [server actions](prisma/api/index.ts) to save or remove it from database
- [page](<app/(products)/livechat/(widgets)/fullscreen/page.tsx>) for [LiveChat Fullscreen](https://platform.text.com/docs/extending-agent-app#main-menu-fullscreen-app) widget - server component that loads all saved customers from database
  - [widget](<app/(products)/livechat/(widgets)/fullscreen/widget.tsx>) - client component that presents list of saved customers and option to delete customer using [server actions](prisma/api/index.ts) to manage
- [livechat.config.json](livechat.config.json) - contains app manifest that is used by [Text Platform | Developer CLI](https://www.npmjs.com/package/@livechat/developer-cli) to manage app

## 🚀 Getting Started

First, ensure that latest version of [Text Platform | Developer CLI](https://www.npmjs.com/package/@livechat/developer-cli) is installed on your machine:

```sh
npm i -g @livechat/developer-cli
```

Then, install dependencies:

```sh
npm install
```

Next, pull latest version of your app manifest:

```sh
txdev app pull
```

You can display your app in [Developer Console](https://platform.text.com/console):

```sh
txdev app open
```

or start local development server running:

```sh
npm run dev
```

## ⚙️ Available Scripts

### `dev`

Runs the app in the development mode.
Open http://localhost:3000 to view it in your browser.
The page will reload when you make changes.
You may also see any lint errors in the console.

Before running your dev environment don't forget you generate your database models and apply migrations:

```
npm run generate
npm run migrate
```

Keep in mind that Prisma need access to your `DATABASE_URL` in `.env` file. Prepare it manually or used `txdev app vars pull` command.

### `build`

Builds the app for production to the `.next` folder.

### `start`

Starts production ready Next.js web server.

## 🧑‍💻 [Text Platform](https://platform.text.com/): who are we?

Behind [Text](https://www.text.com/), there’s a [team of passionate people](https://www.text.com/team/) building online customer service software with online chat, help desk software, chatbot, and web analytics capabilities.

With a suite of five products ([LiveChat](https://www.livechat.com), [ChatBot](https://chatbot.com/), [HelpDesk](https://helpdesk.com/), [KnowledgeBase](https://www.knowledgebase.com/), and [OpenWidget](https://openwidget.com/)) and their powerful APIs, we power customer communication for 36,000 companies in 150 countries.

[The Platform](https://platform.text.com/) is a range of products and services that can be used to build a variety of communication tools for businesses. Our [Developer Program](https://platform.text.com/developer-program) and [Marketplace](https://www.livechat.com/marketplace/) create an open ecosystem for developers, partners, and customers. With our [advanced APIs](https://platform.text.com/) and comprehensive [documentation](https://platform.text.com/docs), you can shape the future of communication with us — starting today.

[Join our Discord](https://discord.com/invite/NcfJu3a9kM) to learn, get inspired, and meet other developers!
