//so ill start by making a function that delays the api like a real api would to give us a loading screen effect.


const wait = (ms = 500) => new promise (resolve => setTimeout(resolve, ms));



//our fake database you guys can now draw from


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
    ],

    //reviews for ruth
    reviews: [

    {
      id: 1,
      userId: 1,
      countryId: 1,
      experienceId: 1,
      rating: 4,
      title: 'Amazing Experience!',
      text: 'The tea ceremony was so peaceful and educational. I learned so much about Japanese culture!',
      date: '2024-04-15',
      helpful: 8
    },
        {
      id: 2,
      userId: 2,
      countryId: 2,
      experienceId: 2,
      rating: 5,
      title: 'Best Cooking im telling you bruh you gotta try it ',
      text: 'The chef was fantastic and the pasta was delicious. Highly recommend!',
      date: '2024-04-10',
      helpful: 12
    }
    ],

    //bookings for chris


      bookings: [
    {
      id: 1,
      userId: 1,
      experienceId: 1,
      date: '2024-06-15',
      people: 2,
      totalPrice: 100,
      status: 'confirmed'
    }
  ]
}






//countries functions for CHRIS

export const countries = {

  //for getting all the countries
    getAll: async () => {await wait();

        return{
            success: true,
            data: fakeDatabase.countries
        };
    },

    //get one country by ID
    getById: async (id) =>
    {
        await wait();
        const country = fakeDatabase.countries.find(c => c.id === parseInt(id) ) //parseInt i used it to convert the id string into a number for you

        if (country){
            return {
                success: true,
                data: country
            };
        }
        return {
            success: false,
            message: 'country not found'
        };
    }
}



export const reviews = {
    getByCountry: async (countryId) => {
        await wait();
        const countryReviews = fakeDatabase.reviews
        .filter(r => r.countryId === parseInt(countryId))
        .map(review => {
            //function for adding user info to each review
            const user = fakeDatabase.users.find(u => u.id ===review.userId)
            return {
                ...review, 
                userName: user ? user.name: 'Unknown',
                userAvatar: user ? user.avatar: ''
            };
        });

        return {
            success: true,
            data: countryReviews
        }

    }
}