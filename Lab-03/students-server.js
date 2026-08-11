const http = require('http');

const students = [
    { id: 1, name: "Mikki", course: "BCA", ScholarID: 23145027 },
    { id: 2, name: "Nisha", course: "BCA", ScholarID: 23145012 },
    { id: 3, name: "Gouri", course: "BCA", ScholarID: 23145008 },
    { id: 4, name: "Kanak", course: "BCA", ScholarID: 23145009 },
    { id: 5, name: "Shreya Singh", course: "BCA", ScholarID: 23145022 },
    { id: 6, name: "Pragya", course: "BCA", ScholarID: 23145014 },
    { id: 7, name: "Shreya Kashyap", course: "BCA", ScholarID: 23145015 },
    { id: 8, name: "Bhaskar", course: "BCA", ScholarID: 23145001 },
    { id: 9, name: "Ayush", course: "BCA", ScholarID: 23145003 },
    { id: 10, name: "Rishab", course: "BCA", ScholarID: 23145009 },
    { id: 11, name: "Sayon", course: "BCA", ScholarID: 23145007 },
    { id: 12, name: "Shudhanshu", course: "BCA", ScholarID: 23145006 }
];

const items = [
    {
        id: 1,
        title: "3 Idiots",
        genre: "Comedy-Drama",
        year: 2009
    },
    {
        id: 2,
        title: "Dangal",
        genre: "Sports-Drama",
        year: 2016
    },
    {
        id: 3,
        title: "Chhichhore",
        genre: "Comedy-Drama",
        year: 2019
    },
    {
        id: 4,
        title: "Taare Zameen Par",
        genre: "Drama",
        year: 2007
    },
    {
        id: 5,
        title: "Zindagi Na Milegi Dobara",
        genre: "Adventure-Drama",
        year: 2011
    }
];

const server = http.createServer((req, res) => {

    res.setHeader('Content-Type', 'application/json');

    // Get all students
    if (req.url === '/students') {
        res.end(JSON.stringify(students));
    }

    // Get students who are in BCA
    else if (req.url === '/students/course/BCA') {
        const bcaStudents = students.filter(
            student => student.course === "BCA"
        );

        res.end(JSON.stringify(bcaStudents));
    }

    // Get one student by ID
    else if (req.url.startsWith('/students/')) {

        const idText = req.url.split('/')[2];

        // Handle non-numeric ID
        if (isNaN(Number(idText))) {
            res.writeHead(400);
            res.end(JSON.stringify({
                error: "Student ID must be a number"
            }));
            return;
        }

        const id = Number(idText);

        const student = students.find(s => s.id === id);

        if (student) {
            res.end(JSON.stringify(student));
        } 
        
        else {
            res.writeHead(404);
            res.end(JSON.stringify({
                error: "Student not found"
            }));
        }
    }

    // Get all movies
    else if (req.url === '/items') {
        res.end(JSON.stringify(items));
    }

    // Get one movie by ID
    else if (req.url.startsWith('/items/')) {

        const idText = req.url.split('/')[2];

        // Handle non-numeric ID
        if (isNaN(Number(idText))) {
            res.writeHead(400);
            res.end(JSON.stringify({
                error: "Movie ID must be a number"
            }));
            return;
        }

        const id = Number(idText);

        const item = items.find(movie => movie.id === id);

        if (item) {
            res.end(JSON.stringify(item));
        } 
        
        else {
            res.writeHead(404);
            res.end(JSON.stringify({
                error: "Movie not found"
            }));
        }
    }

    // Handle unknown routes
    else {
        res.writeHead(404);
        res.end(JSON.stringify({
            error: "Route not found"
        }));
    }
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});