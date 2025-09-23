# Ichundmeinewelt Business‑Backbone – Keystone.js 6

> **Solo Entrepreneur Edition** – A modular, extensible backend built on [Keystone.js 6](https://keystonejs.com/) to power my business operations, content management, CRM, and automation — with a focus on **security**, **scalability**, and **developer experience**.

---

## 📌 Overview

This project is the **central backend** for my business — the **single source of truth** for:

- **Content Management** (Blog, Tags, Series)
- **CRM & Communication** (Contact Submissions, Newsletter Subscribers)
- **Custom GraphQL API** for integration with my [Next.js](https://nextjs.org/) landing page and other services
- **Role‑based Access Control** for secure admin operations
- **Extensible Hooks & Utilities** for business logic
- **Spam‑protected public mutations** for safe form handling
- **GraphQL Codegen** for type‑safe resolvers and API documentation

It is intentionally **modular** and **scalable**, so I can start small and grow features incrementally without rewrites.

## 🚀 Features

### **Core**
- **Keystone.js 6** – Modern, type‑safe Node.js CMS & API framework
- **SQLite** for local development (easy to swap to Postgres/MySQL in production)
- **Role‑based Access Control (RBAC)** – `admin` and `user` roles
- **Authentication** – Email/password login with session management

### **Models**
- **User** – Core authentication entity with role field
- **Post** – Blog posts with slug auto‑generation, cover images, reading time, featured flag
- **Tag** – Categorization for posts
- **Subscriber** – Newsletter signups with consent tracking
- **ContactSubmission** – Stores messages from landing page contact form

### **GraphQL API**
- **Custom GraphQL Extensions** in [`src/graphql`](src/graphql/README.md) (**📖 See full API documentation here**)
  - `helloWorld` query – PoC static message
  - `logMessage` mutation – Logs a message on the server (requires auth)
  - `createSubscriber` mutation – Public newsletter signup with:
    - Honeypot spam protection
    - Email format validation
    - Safe success message return
  - `createContactSubmission` mutation – Public contact form submission with:
    - Honeypot spam protection
    - Email format validation
    - Safe success message return
- **Extendable Schema** – `graphql.extend` API for adding new resolvers

### **Developer Experience**
- **GraphQL Codegen** – Generates:
  - `src/types/graphql.ts` – TypeScript types for schema & resolvers
  - `schema.json` – Introspection schema for API tools
- **Insomnia / Apollo Playground Integration** – Autocomplete & inline docs
- **Hooks** – Example `postHooks.ts` for slug auto‑generation
- **Utilities** – `slugify.ts`, `timestampFields.ts` for DRY field definitions
- **Modular Config** – `src/config/env.ts` & `src/config/storage.ts` for environment & asset storage

---

## 📂 Project Structure

```
src/
  access-control/   # RBAC logic and role enums
  auth.ts           # Keystone auth/session config
  config/           # Environment & storage configuration
  graphql/          # Custom GraphQL extensions (📖 see README inside)
    mutations/      # Custom mutations
    queries/        # Custom queries
    resolvers/      # Pure resolver logic
  hooks/            # Keystone list hooks
  models/           # Keystone list definitions
  types/            # Generated GraphQL types (via Codegen)
  utils/            # Reusable utility functions
```

---

## 🛡 Spam Protection & Honesty Checks

Both `createSubscriber` and `createContactSubmission` include:

- **Honeypot Field** — hidden form field in frontend; if filled → reject as spam.
- **Email Validation** — regex check to ensure valid email format.
- **Data Normalization** — convert `null` → `undefined` before DB insert.
- **Safe Responses** — return generic success messages; no sensitive data exposed.
- **Internal Defaults** — set server‑side (e.g., `status: active`, `consentGiven: true`).

---

## 🧪 Testing in GraphQL Playground

GraphQL API: [http://localhost:3000/api/graphql](http://localhost:3000/api/graphql)

### Create Subscriber
```graphql
mutation {
  createSubscriber(
    email: "test@example.com"
    name: "Test User"
    source: "playground"
    honeypot: ""
  )
}
```

### Create Contact Submission
```graphql
mutation {
  createContactSubmission(
    name: "Jane Doe"
    email: "jane@example.com"
    message: "Hello, I am interested in your services."
    honeypot: ""
  )
}
```

### Log Message
```graphql
mutation {
  logMessage(message: "Hello from Playground!")
}
```

### Hello World
```graphql
query {
  helloWorld
}
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
ASSET_BASE_URL=http://localhost:3000
```

### 3. Run Keystone in development
```bash
pnpm dev
```
- Admin UI: [http://localhost:3000](http://localhost:3000)  
- GraphQL API: [http://localhost:3000/api/graphql](http://localhost:3000/api/graphql)

### 4. Generate GraphQL types & schema
```bash
pnpm codegen
```
- `src/types/graphql.ts` – TypeScript types for resolvers
- `schema.json` – Introspection schema for API tools

---

## 🧩 Adding New Features

### Add a new model
1. Create a new file in `src/models/`
2. Define your list with `list()` and fields
3. Add it to `src/models/index.ts`
4. Run:
   ```bash
   pnpm keystone prisma migrate dev --name add_<model>
   pnpm keystone prisma generate
   ```

### Add a new custom GraphQL resolver
1. Create a resolver in `src/graphql/resolvers/` (pure logic)
2. Create a mutation or query in `src/graphql/mutations/` or `src/graphql/queries/`
3. Register it in `src/graphql/index.ts`
4. Restart Keystone

---

## 📌 Roadmap

### Short‑term
- [ ] Integrate `src/types/graphql.ts` into resolvers for type safety
- [ ] Implement `ContactSubmission` email notifications
- [ ] Add API rate limiting to public mutations

### Medium‑term
- [ ] Add CRM models: `Customer`, `Order`, `Invoice`
- [ ] Implement invoice PDF generation
- [ ] Add dashboard widgets to Admin UI

### Long‑term
- [ ] Deploy to production with Postgres
- [ ] Set up CI/CD pipeline with automated Codegen
- [ ] Integrate with Docusaurus for public API documentation

---

## 📜 License
MIT © [Josip Grgic - ichundmeinewelt]