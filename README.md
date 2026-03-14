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
