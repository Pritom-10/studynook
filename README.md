# StudyNook 📚

### Library Study Room Booking Platform

StudyNook lets students and library staff list private study rooms they manage, while any registered user can search, filter, and book a room for a specific date and time — with automatic conflict detection so no room is ever double-booked.

🔗 **Live Site:** [https://studynook-six.vercel.app]



---

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [Screenshots](#-screenshots)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
- [Project Structure](#️-project-structure)
- [Author](#-author)

---

## ✨ Features

- 🔐 **Secure Authentication** — JWT stored in HTTP-only cookies, plus Google OAuth login
- 🔍 **Search & Filter** — find rooms instantly by name, amenities, floor, or hourly rate
- 📅 **Conflict-Free Booking** — hourly time-slot picker with server-side overlap detection, so a room can never be double-booked
- 💰 **Live Cost Calculator** — total price updates instantly as start/end time is chosen
- 🗂️ **My Bookings Dashboard** — every booking shown with a status badge (confirmed / cancelled), with one-click cancellation for upcoming reservations
- 🏠 **My Listings Dashboard** — room owners can add, edit, and delete their own rooms, with server-side ownership checks
- 🖼️ **Uniform Room Cards** — consistent image sizing and a responsive 3/2/1-column grid across all room listings
- 📱 **Fully Responsive** — polished across mobile, tablet, and desktop
- 🔔 **Toast Notifications** — every success/error state uses non-blocking toasts, never a browser alert
- ⚡ **Dynamic Page Titles & Custom 404** — tab title updates per route, unmatched routes show a friendly not-found page
- ⏳ **Loading States** — centered spinners/skeletons while data is fetched

---

## 🛠️ Tech Stack

**Frontend**
- Next.js (App Router)
- Tailwind CSS
- HeroUI (`@heroui/react`)
- Lucide Icons
- React Hot Toast

**Backend**
- Node.js / Express.js
- MongoDB (native driver)
- JWT (`jose`) for token verification
- CORS

**Deployment**
- Frontend → Vercel
- Backend → Render

---

## 📸 Screenshots

| Home | Room Details | My Bookings |
|---|---|---|
| _add screenshot_ | _add screenshot_ | _add screenshot_ |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- A MongoDB Atlas connection string

### Installation

```bash
# Clone the repo
git clone https://github.com/your-username/studynook-client.git
cd studynook-client

# Install dependencies
npm install

# Run the dev server
npm run dev
```

Visit `http://localhost:3000` to view it locally.

---

## 🔑 Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

> ⚠️ The server has its own `.env` (MongoDB URI, JWT secret, frontend URL for JWKS, etc.) — never commit real values to source control.

---

## 📡 API Reference (Server)

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/all_rooms` | Get all rooms — supports `?search=` | Public |
| `GET` | `/featured` | Latest 6 rooms (home page) | Public |
| `GET` | `/all_rooms/:roomId` | Single room details | Private |
| `POST` | `/all_rooms` | Create a new room | Private |
| `PATCH` | `/all_rooms/:roomId` | Update a room (owner only) | Private |
| `GET` | `/listing/:userId` | Rooms owned by a user | Private |
| `POST` | `/bookings` | Create a booking — conflict-checked | Private |
| `GET` | `/bookings/:userId` | User's bookings, populated with room data | Private |
| `PATCH` | `/bookings/:id/cancel` | Cancel a booking | Private |
| `DELETE` | `/add-room/:id` | Remove a booking/enrollment | Private |

---

## 🗺️ Project Structure

```
app/
├─ page.jsx                  # Home
├─ all_rooms/                # Browse & search rooms
│  └─ [id]/                  # Room details
├─ login/ register/          # Auth pages
├─ my-bookings/               # Private — booking dashboard
├─ my-listings/               # Private — owner's room dashboard
└─ add-room/                  # Private — create a room

Component/
├─ BookingModal.jsx
├─ BookNowButton.jsx
├─ CancelBookingButton.jsx
└─ DeleteRoomButton.jsx

lib/
└─ auth.js
```

---

## 🙋 Author

**Pritom**
Full-stack developer — built as part of a full-stack web development assignment.

---

## 📄 License

This project was built for educational purposes as part of a course assignment.