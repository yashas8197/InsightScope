# 📊 InsightScope

**InsightScope** is an Interactive Data Visualization Dashboard developed with the MERN stack, enhanced by Recharts for charting, and styled using ShadCN. InsightScope empowers users with real-time, interactive data insights for product analytics, featuring seamless data sharing, advanced filtering, and a responsive user interface.

---

## 📝 Problem Statement

Develop a front-end application for a product analytics platform, enabling users to:

- View real-time data on sales, user engagement, and more
- Interactively analyze data with filters and time range selectors
- Share data insights via a URL link with authentication requirements

---

## 🌟 Features

### 1. Interactive Data Visualization

- **Bar Chart**: Display feature analysis with `A`, `B`, `C`, etc., representing features and the x-axis showing total time spent over a selected date range.
- **Line Chart**: Click on any bar to display a time trend for a specific category, complete with panning, zooming, and adjustable time ranges.

### 2. Advanced Filtering

- **Age Filter**: Select between `15-25` or `>25`
- **Gender Filter**: Choose between `Male` and `Female`
- **Date Range Selector**: Pick a custom date range to analyze trends and adjust charts accordingly.

### 3. Cookie Management 🍪

- **User Preferences Storage**: Store selected filters and date ranges as cookies, enabling users to retain preferences upon revisiting.
- **Reset Option**: Allow users to clear saved settings and start fresh.

### 4. URL Sharing 🔗

- **Shareable View**: Users can share specific views by copying a URL that includes selected filters and date ranges.
- **Authentication Requirement**: Secure data by ensuring that users need to log in before accessing shared views.

### 5. Responsive Design 📱💻

- The dashboard is optimized to work seamlessly on desktops, tablets, and mobiles.

---

## 🚀 Tech Stack

- **Frontend**: React, ShadCN (Styling), Recharts (Data Visualization)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **State Management**: Context API / Redux (as needed)

---

## 📂 Project Structure

```plaintext
├── client             # Frontend files (React + ShadCN)
│   ├── src
│   ├── components     # Reusable UI components
│   ├── pages          # Main page components
│   └── styles         # ShadCN styling
├── server             # Backend files (Node.js + Express)
│   ├── models         # MongoDB schemas
│   ├── routes         # API endpoints
│   └── controllers    # Route controllers for API logic
└── README.md          # Project documentation
```
