<<<<<<< HEAD
# Video Portfolio API

A NestJS REST API backend for a video editor portfolio website. Uses MongoDB (Mongoose) for data storage with modules for portfolio items, testimonials, skills, profile, and contact form with email.

## Tech Stack

- **Framework**: NestJS 11
- **Database**: MongoDB + Mongoose
- **Auth**: API Key guard (x-api-key header)
- **Email**: Nodemailer
- **Docs**: Swagger / OpenAPI
- **Validation**: class-validator + class-transformer
- **Rate Limiting**: @nestjs/throttler

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
# Edit .env with your MongoDB URI, email credentials, and API key
```

### 3. Run development server
```bash
npm run start:dev
```

### 4. Seed the database (optional)
```bash
npm run seed
```

### 5. View API docs
Open http://localhost:3000/api in your browser.

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `MONGODB_URI` | ✅ | MongoDB connection string |
| `MONGODB_URI_PROD` | Production only | Production MongoDB URI |
| `MAIL_HOST` | ✅ | SMTP host |
| `MAIL_PORT` | ✅ | SMTP port (default: 587) |
| `MAIL_USER` | ✅ | SMTP username |
| `MAIL_PASS` | ✅ | SMTP password |
| `MAIL_FROM` | ✅ | From email address |
| `ADMIN_API_KEY` | ✅ | API key for admin endpoints |
| `CORS_ORIGIN` | ✅ | Allowed CORS origins (comma-separated) |

## API Endpoints

All endpoints are prefixed with `/api/v1`.

### Portfolio
- `GET /portfolio` — All items (organized by type)
- `GET /portfolio/featured` — Featured items
- `GET /portfolio/type/:type` — By type (video/graphics)
- `GET /portfolio/category/:category` — By category
- `GET /portfolio/:id` — Single item
- `POST /portfolio` — Create *(requires API key)*
- `PATCH /portfolio/:id` — Update *(requires API key)*
- `DELETE /portfolio/:id` — Delete *(requires API key)*

### Skills
- `GET /skills` — All skills (organized by category)
- `GET /skills/top?limit=6` — Top skills by proficiency
- `GET /skills/category/:category` — By category
- `GET /skills/:id` — Single skill
- `POST /skills` — Create *(requires API key)*
- `PATCH /skills/:id` — Update *(requires API key)*
- `DELETE /skills/:id` — Delete *(requires API key)*

### Testimonials
- `GET /testimonials` — All testimonials
- `GET /testimonials/featured` — Featured testimonials
- `GET /testimonials/rating?min=4` — By minimum rating
- `GET /testimonials/:id` — Single testimonial
- `POST /testimonials` — Create *(requires API key)*
- `PATCH /testimonials/:id` — Update *(requires API key)*
- `DELETE /testimonials/:id` — Delete *(requires API key)*

### Profile
- `GET /profile` — Get profile
- `PATCH /profile` — Update profile *(requires API key)*
- `POST /profile/seed` — Seed initial profile *(requires API key)*

### Contact
- `POST /contact` — Send contact email

## Admin Authentication

Protected endpoints require the `x-api-key` header:
```
x-api-key: your-api-key-from-env
```
=======
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
# video-portfolio-api
>>>>>>> 13c3acdb88aed68b530b0b40f5855c1243fecd80
