# GraphQL Layer — ichundmeinewelt-backbone

This folder contains all **custom GraphQL schema extensions** for the Keystone 6 backend.

Keystone automatically generates a CRUD GraphQL API for each list you define in `src/models`.  
Here, we extend that API with **custom queries and mutations** to add business logic, validation, spam protection, and other features that go beyond the default Keystone behaviour.

---

## 📂 Folder Structure

```
src/graphql/
├── index.ts                     # Central entry point for all schema extensions
├── mutations/                   # Custom GraphQL mutations
│   ├── createContactSubmission.ts
│   ├── createSubscriber.ts
│   └── logMessage.ts
├── queries/                      # Custom GraphQL queries
│   └── helloWorld.ts
└── resolvers/                    # Pure business logic for mutations/queries
    ├── createContactSubmissionResolver.ts
    ├── createSubscriberResolver.ts
    └── logMessageResolver.ts
```

---

## 🧩 How It Works

### 1. **Keystone's Default API**
For each list (e.g., `Subscriber`, `ContactSubmission`), Keystone generates:
- Queries: `subscribers`, `subscriber(where: ...)`
- Mutations: `createSubscriber(data: ...)`, `updateSubscriber(...)`, etc.

These are **raw CRUD operations** with no extra logic.

---

### 2. **Custom API Extensions**
We use Keystone’s [`extendGraphqlSchema`](https://keystonejs.com/docs/apis/schema#extendgraphqlschema) in `src/graphql/index.ts` to add **custom fields** to the GraphQL schema.

Each custom field:
- Is defined using `graphql.field` from `@keystone-6/core`.
- Specifies:
  - **Type** — return type (e.g., `graphql.String`).
  - **Args** — arguments accepted by the field.
  - **Description** — for schema introspection & docs.
  - **Resolve function** — calls a pure resolver with `args` and `context`.

---

### 3. **Resolvers**
Resolvers live in `src/graphql/resolvers/` and contain **pure business logic**:
- No GraphQL‑specific code.
- Fully typed using `Context` from `.keystone/types`.
- Easy to unit test in isolation.
- Handle:
  - Validation
  - Spam protection
  - Data normalization
  - Database writes via `context.db.<List>.createOne()`
  - Optional side effects (email, external API sync)

---

## 🚀 Implemented Custom Fields

### **Mutations**

#### `createSubscriber`
- **Purpose:** Public newsletter signup.
- **Args:** `email`, `name?`, `source?`, `honeypot?`
- **Logic:**
  - Honeypot spam check — reject if filled.
  - Email format validation.
  - Normalize `null` → `undefined`.
  - Save to `Subscriber` list with `status: active` and `consentGiven: true`.
- **Returns:** `"Subscription successful"`

---

#### `createContactSubmission`
- **Purpose:** Public contact form submission.
- **Args:** `name`, `email`, `message`, `honeypot?`
- **Logic:**
  - Honeypot spam check — reject if filled.
  - Email format validation.
  - Save to `ContactSubmission` list.
  - Placeholder for sending admin notification.
- **Returns:** `"Message received"`

---

#### `logMessage`
- **Purpose:** Debugging / PoC mutation.
- **Args:** `message` (string)
- **Logic:** Logs message to server console.
- **Access:** Requires signed‑in session.
- **Returns:** `"Logged message: <message>"`

---

### **Queries**

#### `helloWorld`
- **Purpose:** Simple API connectivity test.
- **Args:** None.
- **Returns:** `"Hello World from Keystone custom GraphQL!"`

---

## 🛡 Spam Protection & Honesty Checks

Both `createSubscriber` and `createContactSubmission` include:

- **Honeypot Field:**  
  Hidden form field in frontend.  
  If filled → reject as spam.

- **Email Validation:**  
  Regex check to ensure valid email format.

- **Data Normalization:**  
  Convert `null` → `undefined` before DB insert.

- **Safe Responses:**  
  Return generic success messages — no sensitive data exposed.

---

## 🧪 Testing in GraphQL Playground

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

## 🛠 Adding New Custom Fields

1. **Create Resolver** in `src/graphql/resolvers/`:
   - Pure logic, typed args, uses `context.db`.
2. **Create Mutation/Query** in `src/graphql/mutations/` or `src/graphql/queries/`:
   - Define `graphql.field`, import resolver.
3. **Register** in `src/graphql/index.ts` under `mutation` or `query`.
4. **Restart Keystone** to reload schema.

---

## 📚 References
- [Keystone 6 GraphQL API Docs](https://keystonejs.com/docs/apis/schema)
- [Keystone Context API](https://keystonejs.com/docs/apis/context)
- [GraphQL Playground](https://github.com/graphql/graphql-playground)

---