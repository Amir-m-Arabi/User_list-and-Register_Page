# User List & Register Page

A minimal full‑stack web demo that lets visitors **register** with their first name, last name, username and password, then allows a manager panel to **list, edit and delete** those users.\
Front‑end is plain HTML/CSS/JS (Tailwind powered), while the back‑end is a small Express + MySQL API.

---

## ✨ Features

| Module                                                          | Endpoints / Actions                                                                                                                                               | Notes                                                                                                                                                                                                                                                                                              |
| --------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Auth‑free Registration**                                      | `POST /Sabzlearn/Users/Register`                                                                                                                                  | Saves a new user record in the `register` table ([raw.githubusercontent.com](https://raw.githubusercontent.com/Amir-m-Arabi/User_list-and-Register_Page/main/register.js), [raw.githubusercontent.com](https://raw.githubusercontent.com/Amir-m-Arabi/User_list-and-Register_Page/main/router.js)) |
| **Manager Dashboard**                                           | `PUT /Sabzlearn/Manager/RegisterUser` – list users                                                                                                                |                                                                                                                                                                                                                                                                                                    |
| `DELETE /Sabzlearn/Manager/RemoveUser` – delete by username     |                                                                                                                                                                   |                                                                                                                                                                                                                                                                                                    |
| `PUT /Sabzlearn/Manager/EditUser` – fetch by ID                 |                                                                                                                                                                   |                                                                                                                                                                                                                                                                                                    |
| `POST /Sabzlearn/Manager/UpdateUserInformation` – update record | All routes handled in one Express router ([raw.githubusercontent.com](https://raw.githubusercontent.com/Amir-m-Arabi/User_list-and-Register_Page/main/router.js)) |                                                                                                                                                                                                                                                                                                    |
| **Vanilla JS fetch**                                            | `register.js` posts the signup form; `registered-user.js` renders the table & hooks up edit / delete buttons                                                      | No frameworks on the front‑end ([raw.githubusercontent.com](https://raw.githubusercontent.com/Amir-m-Arabi/User_list-and-Register_Page/main/register.js), [raw.githubusercontent.com](https://raw.githubusercontent.com/Amir-m-Arabi/User_list-and-Register_Page/main/registered-user.js))         |
| **Tailwind Styling**                                            | Local `register.css` compiled via `tailwindcss` `dev` script                                                                                                      | See `package.json` ([raw.githubusercontent.com](https://raw.githubusercontent.com/Amir-m-Arabi/User_list-and-Register_Page/main/package.json))                                                                                                                                                     |

---

## 🏗 Folder structure

```text
.
├─ images/                   # static icons used in the forms
├─ src/output.css            # generated Tailwind build (ignored in Git)
├─ register.html             # public sign‑up page
├─ registered-user.html      # manager panel
├─ register.js               # front‑end logic for sign‑up
├─ registered-user.js        # front‑end logic for dashboard
├─ server.js                 # Express entry
├─ router.js                 # all REST routes
└─ tailwind.config.js        # Tailwind preset
```

---

## ⚡ Quick start

### 1. Clone & install

```bash
git clone https://github.com/Amir-m-Arabi/User_list-and-Register_Page.git
cd User_list-and-Register_Page
npm install
```

### 2. Create MySQL database

```sql
CREATE DATABASE sabzlearn;
USE sabzlearn;

CREATE TABLE register (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstname VARCHAR(50),
  lastname  VARCHAR(50),
  username  VARCHAR(50) UNIQUE,
  password  VARCHAR(255)
);
```

_Update credentials in **`router.js`** if your MySQL user/pass differ._

### 3. Run Tailwind in watch mode (optional)

```bash
npm run dev     # rebuild output.css on changes
```

### 4. Start the API server

```bash
npm start       # runs node server.js on :3000
```

### 5. Open the pages

```
http://localhost:3000/register.html          # public signup
http://localhost:3000/registered-user.html   # dashboard
```

(You can also serve the HTML with any static server.)

---

## 🔌 API reference (JSON)

```http
POST /Sabzlearn/Users/Register
Body  { firstname, lastname, username, password }

PUT  /Sabzlearn/Manager/RegisterUser
→ [ { id, firstname, lastname, username, password } ]

DELETE /Sabzlearn/Manager/RemoveUser
Body  { username }

PUT  /Sabzlearn/Manager/EditUser
Body  { id }
→ [ single user ]

POST /Sabzlearn/Manager/UpdateUserInformation
Body  { id, firstname, lastname, username, password }
```

---

## 📦 Scripts

| Command       | What it does                                                                                                                                         |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run dev` | Tailwind → `register.css` → `src/output.css` (watch mode)                                                                                            |
| `npm start`   | Launch Express on port 3000 ([raw.githubusercontent.com](https://raw.githubusercontent.com/Amir-m-Arabi/User_list-and-Register_Page/main/server.js)) |

---

## 🛡 License

Released under the **ISC** license (same as `package.json`).
