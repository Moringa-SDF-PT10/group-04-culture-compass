<p align="center">
  <img src="src/assets/logo.jpg" alt="Culture Compass Logo" width="150"/>
</p>


#  Culture Compass

Welcome to **Culture Compass**, a vibrant web app that allows users to explore countries, cuisines, share reviews, and interact through bookings and personal profiles. Whether you're a traveler or a cultural enthusiast, this platform brings global experiences to your fingertips.



## 🧭 Feature Content

- [🔐 Authentication (Login & Sign up)](#authentication)
- [🌐 Countries](#countries)
- [⭐ Reviews](#reviews)
- [🍽️ Cuisines](#cuisines)
- [📅 Booking](#booking)


## 🛠️ Technical Content
- [🛠️ Tech Stack](#tech-stack)
- [🚀 Deployment](#deployment)
- [📂 Project Structure](#project-structure)
- [📝 Setup Instructions](#setup-instructions)
- [📄 License](#license)



## 🔐 Authentication

- Sign up & login functionalities using email and password.
- Users must be authenticated to view the countries,leave a review or booking.


## 🌐 Countries

Users can browse a list of countries fetched from the [REST Countries API](https://restcountries.com/), view top 3 reviews, and explore detailed cultural information.


## 🍽️ Cuisines

Cultural cuisines from different countries are displayed with the ability to add or explore dishes from around the world. This section enhances cultural immersion through food.


## 📅 Booking

Users can book cultural experiences (e.g., food tours, cultural visits) related to each country.


## ⭐ Reviews

- Users can post reviews about a country including a rating and comment.
- View the Top 3 reviews the country details page.
- The full reviews list can be filtered by **country**, **rating**, or **date**.


---

## 🛠️ Tech Stack

| Frontend   | Backend        | API              | Deployment |
|------------|----------------|------------|------------|
| React      | JSON Server    | Custom Auth | Netlify (FE) / Render (BE) |
| React Router |   Node.js    | REST Countries API | GitHub |
|Lucide React|


## 🚀 Deployment

- **Frontend**: Deployed on [Netlify](https://www.netlify.com/)
- **Backend (JSON Server)**: Deployed on [Render](https://render.com/)


**Live API Endpoint:**  
`https://group-04-culture-compass.onrender.com/reviews`


**Frontend URL:**  
`https://group-04-culture-compass.netlify.app/`



## 📝 Setup Instructions
To get a copy of the project up and running on your local machine for development and testing purposes, follow these steps.

**Prerequisites:**

- Node.js (for frontend)
- json Server (for backend)
- React
- Git

### 🔧 Local Development

1. **Clone the repo**
```bash
   git clone git@github.com:Moringa-SDF-PT10/group-04-culture-compass.git
   cd culture-compass
```

2. **Install Dependencies**
```bash
npm install
npm install json-server
npm install lucide-react
npm i react-router
npm i react-router-dom
```

3. **Start the backend**
```bash
json-server --watch reviews.json --port 5000
```

4. **Start the frontend**
```bash
npm run dev
```

## Sources
- The countries details are fetched from https://restcountries.com/
- The cusines  are fetched from  https://www.themealdb.com



## 📜 License

This project is licensed under the MIT License. Read more about it [here](https://opensource.org/licenses/MIT).

## 🙌  Contributors
- Micheal Joseph

- Brian Oduory

- Arnold Mutama

- Chris Jesse

- Ruth Siyoi