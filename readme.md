
---


# 🔍 Prisma POC & Learnings

This repository documents a complete walkthrough of Prisma – from setup to advanced features – with practical examples and clear explanations. It serves as both a reference and a learning aid for working with Prisma and TypeScript in a real-world application.

---

## ✅ Run the Project

```bash
# Step 1: Install dependencies
npm install

# Step 2: Initialize database
npx prisma migrate dev --name init

# Step 3: Seed data (optional)
npx prisma db seed

# Step 4: Start development
npx ts-node index.ts
```
---


## 🛠️ Project Setup

### 1. Install Dependencies

```bash
npm install prisma typescript ts-node @types/node nodemon --save-dev
npm install @prisma/client
```

#### 🔹 Why each package?

* **prisma** – Prisma CLI used for managing schema, migrations, and database syncing.
* **typescript** – Enables you to write code in TypeScript.
* **ts-node** – Allows execution of `.ts` files directly in Node.js (e.g., for seed scripts).
* **@types/node** – Provides TypeScript type definitions for Node.js.
* **nodemon** – Automatically restarts the app on file changes (useful for local dev).
* **@prisma/client** – The generated Prisma client used for querying the database (runtime dependency).

📌 Dev dependencies are only needed during development, hence installed with `--save-dev`.

---

### 2. Create `tsconfig.json`

Run:

```bash
npx tsc --init
```

Then edit to include the following common settings:

```json
{
  "compilerOptions": {
    "target": "ES2020",            // Latest JS features
    "module": "commonjs",          // Node.js compatible module system
    "strict": true,                // Enables strict typing
    "esModuleInterop": true,       // Allows default import syntax
    "outDir": "dist",              // Output directory for compiled JS
    "skipLibCheck": true           // Speeds up build by skipping type checks on libs
  },
  "include": ["prisma", "src", "seed.ts"]
}
```

---

### 3. Initialize Prisma

```bash
npx prisma init
```

This creates:

```
📁 prisma/
 ├── schema.prisma        # Define your models here
📄 .env                    # Store DATABASE_URL and secrets
```

---

### 4. Set Up Local Database (e.g., PostgreSQL)

In `.env`, configure your DB connection string:

```env
DATABASE_URL="postgresql://youruser:yourpassword@localhost:5432/yourdb"
```

Make sure PostgreSQL is running and the database exists.

---

### 5. Apply Migrations

Run:

```bash
npx prisma migrate deploy
```

This command applies all existing migrations to your local DB — useful for syncing without resetting.

To create a new migration when the schema changes:

```bash
npx prisma migrate dev --name your_migration_name
```

---

## 📚 Prisma Concepts & Commands

---

### 🔁 What is Prisma Migrate?

Prisma Migrate is a tool to track and apply schema changes to your database over time using version-controlled migration files.

#### 💡 Common Commands

| Command          | Purpose                                                                  |
| ---------------- | ------------------------------------------------------------------------ |
| `migrate dev`    | Creates + applies a new migration, regenerates the client                |
| `migrate deploy` | Applies all existing migrations (used in prod)                           |
| `migrate reset`  | Drops and recreates DB, applies all migrations, runs seed (for dev only) |

---

### ⚙️ What is `prisma generate`?

```bash
npx prisma generate
```

Generates the **Prisma Client** based on your schema. Run this after:

* Changing your schema manually
* Pulling changes from version control

---

## 🔤 Field Types with Examples

```prisma
model User {
  id        Int       @id @default(autoincrement())
  name      String
  email     String    @unique
  isActive  Boolean   @default(true)
  age       Int?
  balance   Float
  joinedAt  DateTime  @default(now())
}
```

| Type       | Description         |
| ---------- | ------------------- |
| `String`   | Text                |
| `Int`      | Integer             |
| `Float`    | Decimal             |
| `Boolean`  | true/false          |
| `DateTime` | Timestamp           |
| `?`        | Optional / Nullable |



---

## 🔗 Understanding Relationships in Prisma

In Prisma, relationships between models are declared using:

* **Foreign keys** (via `fields` and `references`)
* The **`@relation`** attribute
* Optional settings like **`@unique`** or implicit many-to-many support

Here’s a breakdown of each relationship type and how it works under the hood.

---

### 🔸 1. One-to-One Relationship (`1:1`)

#### 🔍 Concept

* One record in **Model A** is linked to exactly one record in **Model B**
* Represented by a **foreign key** with a `@unique` constraint to ensure exclusivity

#### 🧱 Prisma Schema

```prisma
model User {
  id      Int     @id @default(autoincrement())
  email   String  @unique
  profile Profile?
}

model Profile {
  id     Int    @id @default(autoincrement())
  bio    String
  userId Int    @unique

  user   User   @relation(fields: [userId], references: [id])
}
```

#### 🧠 How It Works

* The `Profile` model has a **foreign key field** `userId` pointing to `User.id`
* The `@relation` directive defines which fields link the two models
* `@unique` on `userId` ensures **only one profile per user**

---

### 🔸 2. One-to-Many Relationship (`1:N`)

#### 🔍 Concept

* One record in **Model A** can be related to **multiple** records in **Model B**
* The **“many” side** holds the foreign key

#### 🧱 Prisma Schema

```prisma
model User {
  id    Int     @id @default(autoincrement())
  name  String
  posts Post[]  // One-to-many: User → Posts
}

model Post {
  id      Int    @id @default(autoincrement())
  title   String
  userId  Int

  user    User   @relation(fields: [userId], references: [id])
}
```

#### 🧠 How It Works

* The `Post` model has a `userId` field that stores the foreign key
* The `@relation` attribute connects `Post.userId` to `User.id`
* The `User` model has an **array field (`Post[]`)** to represent all related posts
* Prisma maps this to a standard SQL **one-to-many relationship** with a foreign key

---

### 🔸 3. Many-to-Many Relationship (`M:N`)

#### 🔍 Concept

* Records in both models can have **multiple** associations with each other
* Prisma supports this automatically using an **implicit join table**

#### 🧱 Prisma Schema

```prisma
model Student {
  id      Int       @id @default(autoincrement())
  name    String
  courses Course[]  @relation("Enrollments")
}

model Course {
  id       Int       @id @default(autoincrement())
  title    String
  students Student[] @relation("Enrollments")
}
```

#### 🧠 How It Works

* Both models use array fields to define the many-to-many relationship
* The `@relation("Enrollments")` ensures both sides reference the same join
* Prisma **auto-generates a join table** named something like `_CourseToStudent` (unless you use explicit join model)

---

## ⚠️ Notes on Defining Relations in Prisma

| Concept               | Description                                                             |
| --------------------- | ----------------------------------------------------------------------- |
| `@relation`           | Tells Prisma which fields form the relationship and what they reference |
| `fields`              | Foreign key field(s) in the current model                               |
| `references`          | Primary key(s) in the related model                                     |
| Optional fields (`?`) | Used for nullable or optional relationships (e.g., `Profile?`)          |
| `@unique`             | Enforces 1:1 cardinality in one-to-one relationships                    |
| Implicit join         | Used in many-to-many; Prisma generates the join table automatically     |

---

## ✅ Summary Table

| Relationship Type | How to Define It                                 | Requires Foreign Key? | Generates Join Table? | Description    |  
| ----------------- | ------------------------------------------------ | --------------------- | --------------------- | --------------------- |
| One-to-One        | Use `@relation` with `@unique` foreign key       | ✅ Yes                 | ❌ No       | User → Posts                      |
| One-to-Many       | Add array field to "one", FK to "many"           | ✅ Yes                 | ❌ No      | Post → User                       |
| Many-to-Many      | Arrays on both models with same `@relation` name | ❌ No (auto-managed)   | ✅ Yes        | Use singular relation (e.g., `Profile` linked to `User`)         |

---


## 🏷️ Attributes with Examples

```prisma
model Example {
  id     Int     @id @default(autoincrement())   // Primary key with auto increment
  name   String  @map("full_name")               // Custom column name
  email  String  @unique                         // Unique constraint
  tags   String[]                                // Array field (PostgreSQL)
}
```

---

## 🎲 Enum Example

```prisma
enum Role {
  USER
  ADMIN
  MODERATOR
}

model User {
  id   Int   @id @default(autoincrement())
  role Role  @default(USER)
}
```

---

## ✍️ Create Operations

```ts
// Create
await prisma.user.create({
  data: {
    name: "Alice",
    email: "alice@example.com"
  }
})

// Create with relation
await prisma.post.create({
  data: {
    title: "My Post",
    user: {
      connect: { id: 1 }
    }
  }
})

// Create Many
await prisma.user.createMany({
  data: [
    { name: "A", email: "a@x.com" },
    { name: "B", email: "b@x.com" }
  ]
})
```

---

## 🔍 Read Operations

```ts
// Find unique
await prisma.user.findUnique({ where: { id: 1 } })

// Find first (with conditions)
await prisma.user.findFirst({ where: { name: { startsWith: "A" } } })

// Find many
await prisma.user.findMany({ where: { isActive: true } })

// With include
await prisma.user.findUnique({
  where: { id: 1 },
  include: { posts: true }
})

// With select
await prisma.user.findUnique({
  where: { id: 1 },
  select: { name: true, email: true }
})
```

---



## 📊 Advanced Query Features in Prisma

Prisma provides powerful query modifiers that help with pagination, sorting, and ensuring uniqueness in results. These features are commonly used in dashboards, APIs, and admin panels.

### 🔹 `distinct`

Returns only unique values for specified fields. Useful when there are duplicates in the database and you want to eliminate them.

```ts
await prisma.user.findMany({
  distinct: ['email']  // Removes duplicates based on email
})
```

> 💡 Use Case: You accidentally seeded the same email multiple times and want to show each only once.

---

### 🔹 `take` and `skip`

Used for pagination.

* `take`: Limits the number of returned records.
* `skip`: Skips a number of records before returning results.

```ts
await prisma.user.findMany({
  skip: 10,     // Skip first 10 users
  take: 5       // Then take the next 5 users
})
```

> 💡 Use Case: Paginate results in a frontend table (`page 3 = skip 10, take 5`)

---

### 🔹 `orderBy`

Sorts the results based on a field in ascending (`asc`) or descending (`desc`) order.

```ts
await prisma.user.findMany({
  orderBy: {
    name: 'asc'   // Sort alphabetically by name
  }
})
```

> 💡 Use Case: Display a list of users sorted by name or creation date.

---

### 🔄 Combined Example

```ts
await prisma.user.findMany({
  where: {
    isActive: true
  },
  distinct: ['email'],
  orderBy: {
    name: 'asc'
  },
  skip: 5,
  take: 10
})
```

This returns:

* ✅ Active users only
* ✅ With unique emails
* ✅ Sorted by name (A–Z)
* ✅ Starting after the first 5
* ✅ Returning 10 results max

---

### ⚠️ Notes

* `distinct` only works with **scalar fields** (e.g., `email`, not `posts`).
* You can **combine multiple** modifiers in the same query for powerful querying.
* These features are ideal for building **efficient, paginated, sorted UIs**.

---

## 🔧 Update Operations

```ts
// Update
await prisma.user.update({
  where: { id: 1 },
  data: { name: "Updated" }
})

// Update many
await prisma.user.updateMany({
  where: { isActive: false },
  data: { isActive: true }
})
```

---

## ❌ Delete Operations

```ts
await prisma.user.delete({
  where: { id: 1 }
})

await prisma.user.deleteMany({
  where: { isActive: false }
})
```

---

## 🌱 Seeding the Database

### 1. Create `prisma/seed.ts`

```ts
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.user.create({
    data: { name: "Seed User", email: "seed@example.com" }
  })
}

main()
  .then(() => prisma.$disconnect())
  .catch(e => {
    console.error(e)
    prisma.$disconnect()
    process.exit(1)
  })
```

### 2. Add to `package.json`

```json
{
  "prisma": {
    "seed": "ts-node prisma/seed.ts"
  }
}
```

### 3. Run the seed script

```bash
npx prisma db seed
```

You can also use `migrate dev` or `migrate reset` to trigger seeding automatically.

---

## 🧰 `prisma db` Commands

| Command   | Description                                             |
| --------- | ------------------------------------------------------- |
| `db push` | Push schema changes directly to DB (no migration files) |
| `db pull` | Introspect existing DB into Prisma models               |
| `db seed` | Run the configured seed script                          |



---

## 📘 Learn More

* [Prisma Docs](https://www.prisma.io/docs)
* [Prisma Examples](https://github.com/prisma/prisma-examples)
* [Awesome Prisma](https://github.com/catalinmiron/awesome-prisma)

---

## 🏁 Summary

This README covers:

* Full Prisma setup with TypeScript
* Core commands: `migrate`, `generate`, `seed`, `db pull/push`
* CRUD queries with real examples
* Schema modeling with field types, relationships, enums, and attributes

Use this repo as a reference when building real-world apps with Prisma + TypeScript.


