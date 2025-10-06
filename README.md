# Gridium Energy Analytics Dashboard

A modern web application built with Ember.js that consumes and displays energy meter readings and billing data from the Snapmeter API.

![Ember.js](https://img.shields.io/badge/Ember.js-6.7-E04E39?style=flat&logo=emberdotjs)
![Node.js](https://img.shields.io/badge/Node.js-20.11+-339933?style=flat&logo=nodedotjs)

## 🚀 Features

- **Interactive Dashboard** - Central hub with easy navigation to readings and bills
- **Meter Readings View** - Displays energy consumption data with a clean, responsive table
- **Bills View** - Summary statistics and expandable bill cards with detailed information
- **Modern UI/UX** - Beautiful gradient design with smooth animations
- **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile devices

## 📋 Prerequisites

Before running this application, ensure you have the following installed:

- **Node.js** (version 20.11 or higher)
- **npm** (comes with Node.js)
- **Ember CLI** (version 6.7 or higher)

## 🛠️ Installation

### 1. Install Ember CLI Globally (if not already installed)

```bash
npm install -g ember-cli
```

### 2. Navigate to the Project Directory

```bash
cd gridium-assessment
```

### 3. Install Dependencies

```bash
npm install
```

## 🎯 Running the Application

### Development Mode

Start the development server:

```bash
npm start
```

Or alternatively:

```bash
ember serve
```

The application will be available at:

```
http://localhost:4200
```

The development server includes:

- Live reload (automatically refreshes when you make changes)
- Source maps for debugging
- Error reporting in the browser

### Production Build

To create an optimized production build:

```bash
npm run build
```

The built files will be in the `dist/` directory.

## 📁 Project Structure

```
gridium-assessment/
├── app/
│   ├── components/          # Reusable UI components
│   │   ├── readings-display.js
│   │   ├── readings-display.hbs
│   │   ├── bills-display.js
│   │   └── bills-display.hbs
│   ├── routes/              # Route handlers
│   │   ├── dashboard.js
│   │   ├── readings.js
│   │   └── bills.js
│   ├── services/            # Application services
│   │   └── api.js           # API service for fetching data
│   ├── styles/              # Application styles
│   │   └── app.css
│   ├── templates/           # Route templates
│   │   ├── application.hbs
│   │   ├── dashboard.hbs
│   │   ├── readings.hbs
│   │   └── bills.hbs
│   ├── app.js
│   └── router.js            # Application router
├── config/                  # Configuration files
├── package.json
└── README.md
```

## 🔌 API Integration

The application consumes data from two Snapmeter API endpoints:

### Meter Readings

```
GET https://snapmeter.com/api/public/meters/2080448990211/readings?start=2023-09-01&end=2023-10-01
```

### Bills

```
GET https://snapmeter.com/api/public/services/2080448990210/bills?start=2018-09-01&end=2024-01-01
```

**Authentication**: Both endpoints require an `Authorization` header with the token.

### Environment Configuration

The application uses environment variables for configuration. Create a `.env` file in the project root:

```bash
# Snapmeter API Configuration
SNAPMETER_AUTH_TOKEN=4f981c43-bf28-404c-ba22-461b5979b359
METER_ID=2080448990211
SERVICE_ID=2080448990210
```

**Note**:

- The `.env` file is already in `.gitignore` for security
- The application uses the `dotenv` package to load environment variables
- If no `.env` file exists, the application will use default values from `config/environment.js`

### API Configuration

All API configuration is centralized in:

- `config/environment.js` - Environment-specific settings
- `app/constants/api.js` - API endpoints and constants

This makes it easy to:

- Change API endpoints
- Update authentication tokens
- Modify date ranges
- Switch between different environments

## 🎨 Key Components

### API Service (`app/services/api.js`)

Handles all API requests with:

- Async/await pattern
- Error handling
- Loading states
- Configurable date ranges

### Readings Display Component

Features:

- Simple table of readings
- Pagination for performance
- Formatted dates and values

### Bills Display Component

Features:

- Summary statistics (total bills, total cost, average cost, total usage)
- Expandable bill cards for detailed information
- Currency and date formatting
- Comprehensive bill details view

## 🖥️ Application Routes

- `/` - Dashboard (home page with navigation cards)
- `/readings` - Meter readings view
- `/bills` - Bills and billing information view

## 🔍 Linting

Run linters to check code quality:

```bash
npm run lint
```

Auto-fix linting issues:

```bash
npm run lint:fix
```

## 🎯 Future Enhancements

Potential improvements for future versions:

- Date range picker for custom queries
- Export functionality (CSV, PDF)
- User authentication and personalization
- Data visualization with charts (Chart.js or D3.js)
- Real-time data updates

---

## 🚀 Quick Start Guide

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start the server:**

   ```bash
   npm start
   ```

3. **Open your browser:**

   ```
   http://localhost:4200
   ```

4. **Navigate the app:**
   - View the dashboard
   - Click on "Meter Readings" to see consumption data
   - Click on "Billing Information" to view bills
   - Data displays simply without sorting or filtering (planned as future enhancements)

Enjoy exploring your energy data! ⚡
