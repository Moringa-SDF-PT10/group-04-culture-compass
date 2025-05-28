//so ill start by making a function that delays the api like a real api would to give us a loading screen effect.


const wait = (ms = 500) => new promise (resolve => setTimeout(resolve, ms));



//our fake adatabase you guys can now draw from


const fakeDatabase = {


    //sample users

    users : [
        {
      id: 1,
      name: 'Hugh Jazz',
      email: 'Jazz@example.com',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      bio: 'Love traveling and learning about new cultures!',
      location: 'New York, USA',
      joinedDate: '2023-01-15',
      countriesVisited: 5,
      reviewsWritten: 12
        },

       {
      id: 2,
      name: 'Michael joseph',
      email: 'aoinihonjin@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c5cd?w=100&h=100&fit=crop',
      bio: 'Cultural explorer and food enthusiast',
      location: 'London, UK',
      joinedDate: '2023-03-20',
      countriesVisited: 8,
      reviewsWritten: 25
    }
    ],

    countries: [
    {
        id: 1,
      name: 'Japan',
      flag: '🇯🇵',
      continent: 'Asia',
      capital: 'Tokyo',
      language: 'Japanese',
      currency: 'Yen',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&h=300&fit=crop',
      description: 'Experience amazing temples, delicious food, and modern cities in Japan.',
      highlights: ['Cherry Blossoms', 'Temples', 'Sushi', 'Technology'],
      bestTimeToVisit: 'Spring (March-May)',
      averageRating: 4.8,
      totalReviews: 234

    },

    {
      id: 2,
      name: 'Italy',
      flag: '🇮🇹',
      continent: 'Europe',
      capital: 'Rome',
      language: 'Italian',
      currency: 'Euro',
      image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=600&h=300&fit=crop',
      description: 'Discover incredible art, history, and amazing pasta in Italy.',
      highlights: ['Colosseum', 'Pizza', 'Art', 'Beautiful Cities'],
      bestTimeToVisit: 'Spring/Fall (April-June, Sept-Oct)',
      averageRating: 4.7,
      totalReviews: 189
    },

    {
      id: 3,
      name: 'Morocco',
      flag: '🇲🇦',
      continent: 'Africa',
      capital: 'Rabat',
      language: 'Arabic',
      currency: 'Dirham',
      image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6b?w=600&h=300&fit=crop',
      description: 'Explore colorful markets, desert adventures, and unique architecture.',
      highlights: ['Sahara Desert', 'Markets', 'Architecture', 'Spices'],
      bestTimeToVisit: 'Fall/Winter (Oct-April)',
      averageRating: 4.6,
      totalReviews: 156
    }
    ]













}