module.exports = [
    {
        id: '01',
        title: 'Node.js Basics and Data Types',
        topic: 'Node.js console output, variables and data types',
        type: 'script',
        file: '../Lab-01/app.js'
    },
    {
        id: '02',
        title: 'Basic HTTP Server',
        topic: 'http module, routing, text and JSON responses',
        type: 'server',
        file: '../Lab-02/server.js',
        try: '/profile'
    },
    {
        id: '03',
        title: 'Dynamic Student and Movie API',
        topic: 'dynamic routes, find(), filter(), status codes',
        type: 'server',
        file: '../Lab-03/students-server.js',
        try: '/students'
    },
    {
        id: '04',
        title: 'Advanced Search, Filter and Sort API',
        topic: 'query parameters, filtering, searching and sorting',
        type: 'server',
        file: '../Lab-04/advanced-server.js',
        try: '/students?course=BCA&minMarks=60&sort=marks&order=desc'
    },
    {
        id: '05',
        title: 'Async JavaScript Food Delivery',
        topic: 'callbacks, Promises, async/await and Promise.all()',
        type: 'script',
        file: '../Lab-05/async-await-version.js'
    },
    {
        id: '06',
        title: 'File System Module',
        topic: 'fs module, asynchronous file reading',
        type: 'script',
        file: '../Lab-06/read-async.js'
    },
    {
        id: '07',
        title: 'EventEmitter Order Tracker',
        topic: 'EventEmitter, listeners, once(), error handling and events',
        type: 'script',
        file: '../Lab-07/order-tracker.js'
    }
];
