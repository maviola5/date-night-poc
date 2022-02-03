export const environment = {
  firebase: {
    apiKey: 'AIzaSyAUHrJjnKBk57rEb82z3Hu5Z6LQFS3AXaU',
    authDomain: 'date-night-poc.firebaseapp.com',
    databaseURL: 'https://date-night-poc-default-rtdb.firebaseio.com',
    projectId: 'date-night-poc',
    storageBucket: 'gs://date-night-poc.appspot.com',
    messagingSenderId: '759992618510',
    appId: '1:759992618510:ios:0f571fc4be85b5c344f65f',
  },
  movieServiceAPI: {
    baseURL: process.env.LOCAL
      ? 'https://date-night-poc-service-43zjo244ma-uk.a.run.app/'
      : 'http://localhost:8080',
    imageURL: 'https://image.tmdb.org/t/p/',
  },
};
