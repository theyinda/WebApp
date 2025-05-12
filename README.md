# TPT - WebApp

A web app that allows two types of users — Admins and Customers — to interact with order data in different ways.

Features

1. Authentication (JWT-based)

Users can sign up and log in.

Two roles supported: Admin and Customer.

Role-based access control determines what each user can do after login.

If you're registering through the app, you'll be signed up as a Customer by default.

Admin users already exist in the system for demo purposes.

2. Customer Dashboard
   Once a customer logs in, they land on their dashboard, where they can:

See a list of all their orders in a sortable table.

Create a new order by clicking the "Create Order" button.

Fill the form with the order details as follows:

Product Name (text input)

Product Category (dropdown)

Price (number input)

Order Date (date picker)

Customer Name is pre-filled from their profile and not editable.

Table functionality:

Each row is selectable.

There's an action button (three dots) at the end of each row for editing/deleting.

3. Admin Dashboard
   Once an admin logs in, they’re shown a sales analytics dashboard, with:

A Pie Chart showing orders grouped by product category.

A Line Graph showing revenue trends over time.

A universal filter that allows filtering the charts by month and/or year.

All data is pulled dynamically from the backend via endpoints.

Admins can manage all orders — create, update, and delete.

4. Design Choices
   Built with React + TypeScript for maintainability.

Used Chart.js for data visualizations

MUI (Material UI) handles the component styling.

Every form includes basic validation and proper error handling.

Clean navigation with active tab highlighting.

5. Backend (Node.js + Express + TypeScript + Prisma)

All APIs are protected with JWT tokens.

Role-based logic ensures:

Customers can only create orders.

Admins can create, update, delete, and view everything.

API Endpoints:

Get, Create, update, Delete orders

Fetch analytics: total revenue, order count, customer count

6. Deployment
   Hosted on Vercel for Frontend, Render for Backend.

All environment variables (like JWT secrets and DB URLs) are stored securely.

Live demo link: https://web-app-tawny-pi.vercel.app/

Admin Demo Credentials
To test the admin dashboard without registering:

```sh
  Email: admin@gmail.com
  Password: Password1@

```
