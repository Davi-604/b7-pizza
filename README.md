# 🍕 B7 Pizza - E-commerce com Next.js + Stripe

## 📌 Sobre o projeto

Este projeto é um e-commerce simples de pizzaria desenvolvido com o objetivo de praticar conceitos modernos de desenvolvimento full stack, com foco principal em:

* Integração de pagamentos com **Stripe**
* Gerenciamento de estado com **Zustand**
* Uso de **Next.js (App Router)**
* Persistência de dados com **Prisma + PostgreSQL**
* Execução via **Docker**

A aplicação permite que o usuário navegue pelos produtos, adicione itens ao carrinho e finalize a compra utilizando checkout com Stripe.

---

## 🧠 Tecnologias utilizadas

* Next.js
* Prisma ORM
* PostgreSQL
* Stripe
* Zustand
* Docker

---

## ⚙️ Como rodar o projeto localmente

### 🔧 Pré-requisitos

* Node.js (recomendado usar via WSL no Windows)
* Docker (opcional, mas recomendado)
* NPM ou Yarn

---

## 🚀 Rodando de forma local

### 1. Clone o projeto

```bash
git clone <url-do-repositorio>
cd b7-pizza
```

---

### 2. Instale as dependências

```bash
npm install
```

---

### 3. Configure o arquivo `.env`

Crie um arquivo `.env` na raiz do projeto com base no exemplo:

```env
DATABASE_URL="postgres://postgres:postgres@localhost:5432/b7_pizza?schema=public"

POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=b7_pizza

NEXT_PUBLIC_BASE_URL=http://localhost:3000

STRIPE_WEBHOOK_SECRET="your_webhook_key"
STRIPE_API_KEY="your_api_stripe_key"
STRIPE_SECRET_KEY="your_secret_stripe_key"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="your_publishable_stripe_key"
```

---

### 4. Rode as migrations

```bash
npx prisma migrate dev
```

---

### 5. Popule o banco com dados de teste

```bash
npx prisma db seed
```

---

### 6. Inicie o projeto

```bash
npm run dev
```

A aplicação estará disponível em:

```
http://localhost:3000
```

---

## 💳 Rodando o Stripe localmente (Webhook)

Para que o fluxo de pagamento funcione corretamente em ambiente local, é necessário rodar o listener de webhook do Stripe.

### 1. Instale o Stripe CLI

```bash
curl -s https://packages.stripe.com/install.sh | sudo bash
```

---

### 2. Faça login no Stripe

```bash
stripe login
```

---

### 3. Inicie o listener de webhook

```bash
stripe listen --forward-to localhost:3000/api/webhook
```

---

### 4. Copie o webhook secret gerado

Após rodar o comando acima, será exibido:

```
whsec_xxxxxxxxx
```

Adicione esse valor no `.env`:

```env
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxx
```

---

## 🐳 Rodando com Docker

### 1. Suba os containers

```bash
docker compose up --build
```

---

### 2. Execute as migrations

```bash
docker compose exec web npx prisma migrate dev
```

---

### 3. Execute o seed

```bash
docker compose exec web npx prisma db seed
```

---

## 🛒 Funcionalidades

* Listagem de pizzas
* Carrinho de compras
* Autenticação simples
* Checkout com Stripe
* Criação de pedidos
* Persistência de dados com Prisma

---

## 📦 Gerenciamento de estado

O projeto utiliza **Zustand** para:

* Controle de autenticação do usuário
* Gerenciamento do carrinho de compras

---

## 📄 Licença

Este projeto é apenas para fins de estudo baseado no curso da B7Web.
