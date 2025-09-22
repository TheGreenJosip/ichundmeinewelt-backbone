# Ichundmeinewelt Business-Backbone – Keystone.js 6

> **Solo Entrepreneur Edition** – A modular, extensible backend built on [Keystone.js 6](https://keystonejs.com/) to power my business operations, content management, and future automation.

---

## 📌 Overview

This project is the **central backend** for my business, designed to be the **single source of truth** for:

- **Content Management** (Blog, Tags)
- **CRM & Communication** (Contact Submissions)
- **Custom GraphQL API** for integration with my Next.js landing page and other services
- **Role‑based Access Control** for secure admin operations
- **Extensible Hooks & Utilities** for business logic
- **GraphQL Codegen** for type‑safe resolvers and API documentation

It is intentionally **modular** and **scalable**, so I can start small and grow features incrementally without rewrites.

---

## 🚀 Features

### Core
- **Keystone.js 6** – Modern, type‑safe Node.js CMS & API framework
- **SQLite** for local development (easy to swap to Postgres/MySQL in production)
- **Role‑based Access Control (RBAC)** – `admin` and `user` roles
- **Authentication** – Email/password login with session management

### Models
- **User** – Core authentication entity with role field
- **Post** – Blog posts with slug auto‑generation and timestamps
- **Tag** – Categorization for posts
- **ContactSubmission** – Stores messages from landing page contact form

### GraphQL
- **Custom GraphQL Extensions** – Modular queries and mutations in `src/graphql`
  - `helloWorld` query – PoC static message
  - `logMessage` mutation – Logs a message on the server (with resolver separation)
- **Extendable Schema** – `graphql.extend` API for adding new resolvers

### Developer Experience
- **GraphQL Codegen** – Generates:
  - `src/types/graphql.ts` – TypeScript types for schema & resolvers
  - `schema.json` – Introspection schema for Insomnia/Postman
- **Insomnia Integration** – Import `schema.json` for autocomplete & inline docs
- **Hooks** – Example `postHooks.ts` for slug auto‑generation
- **Utilities** – `slugify.ts`, `timestampFields.ts` for DRY field definitions

---

## 📂 Project Structure

```
src/
  access-control/   # RBAC logic and role enums
  auth.ts           # Keystone auth/session config
  graphql/          # Custom GraphQL extensions
    mutations/      # Custom mutations
    queries/        # Custom queries
    resolvers/      # Pure resolver logic
  hooks/            # Keystone list hooks
  models/           # Keystone list definitions
  types/            # Generated GraphQL types (via Codegen)
  utils/            # Reusable utility functions
```

---

## 🛠️ Getting Started

### 1. Install dependencies
```bash
pnpm install
```

### 2. Set up environment
Create a `.env` file in the project root:
```env
SESSION_SECRET=your-secret-here
```

### 3. Run Keystone in development
```bash
pnpm dev
```
Keystone Admin UI: [http://localhost:3000](http://localhost:3000)  
GraphQL API: [http://localhost:3000/api/graphql](http://localhost:3000/api/graphql)

### 4. Generate GraphQL types & schema
```bash
pnpm codegen
```
- `src/types/graphql.ts` – TypeScript types for resolvers
- `schema.json` – Introspection schema for API tools

---

## 📖 Using with Insomnia

1. Open Insomnia and create a new GraphQL request.
2. Set the endpoint to:
   ```
   http://localhost:3000/api/graphql
   ```
3. Import `schema.json` (Preferences → Data → Import Data → From File) for offline schema.
4. Enjoy autocomplete, argument hints, and inline docs.

---

## 🧩 Adding New Features

### Add a new model
1. Create a new file in `src/models/`
2. Define your list with `list()` and fields
3. Add it to `src/models/index.ts`

### Add a new custom GraphQL resolver
1. Create a file in `src/graphql/queries` or `src/graphql/mutations`
2. Export a `graphql.field()` with `description` and `args`
3. Register it in `src/graphql/index.ts`

---

## 📌 TODO

### Short‑term
- [ ] Integrate `src/types/graphql.ts` into resolvers for type safety
- [ ] Add `username` field to `User` and support login via email or username
- [ ] Implement `ContactSubmission` email notifications via Azure
- [ ] Add case‑insensitive login checks

### Medium‑term
- [ ] Add CRM models: `Customer`, `Order`, `Invoice`
- [ ] Implement invoice PDF generation
- [ ] Add dashboard widgets to Admin UI
- [ ] Add API rate limiting & request logging

### Long‑term
- [ ] Deploy to production with Postgres
- [ ] Set up CI/CD pipeline with automated Codegen
- [ ] Integrate with Docusaurus for public API documentation

---

## 📜 License
MIT © [Josip Grgic - ichundmeinewelt]