const http = require('http');
const url = require('url');

const students = [
    { id: 1, name: "Mikki", course: "BCA", marks: 88 },
    { id: 2, name: "Nisha", course: "BCA", marks: 76 },
    { id: 3, name: "Gouri", course: "BCA", marks: 65 },
    { id: 4, name: "Kanak", course: "BCA", marks: 92 },
    { id: 5, name: "Shreya", course: "BIT", marks: 58 },
    { id: 6, name: "Pragya", course: "BIT", marks: 81 },
    { id: 7, name: "Bhaskar", course: "BCA", marks: 45 },
    { id: 8, name: "Ayush", course: "BIT", marks: 70 }
];

const server = http.createServer((req, res) => {

    res.setHeader('Content-Type', 'application/json');

    const parsedUrl = url.parse(req.url, true);
    const pathName = parsedUrl.pathname;
    const query = parsedUrl.query;

    // Bonus: Course route
    if (pathName.startsWith('/students/course/')) {

        const courseName = pathName.split('/')[3];

        let result = students.filter(
            student =>
                student.course.toLowerCase() === courseName.toLowerCase()
        );

        // Minimum marks filter
        if (query.minMarks) {

            const minMarks = Number(query.minMarks);

            if (isNaN(minMarks)) {
                res.writeHead(400);
                res.end(JSON.stringify({
                    error: "minMarks must be a number"
                }));
                return;
            }

            result = result.filter(
                student => student.marks >= minMarks
            );
        }

        // Search filter
        if (query.search) {

            const searchText = query.search.toLowerCase();

            result = result.filter(
                student =>
                    student.name.toLowerCase().includes(searchText)
            );
        }

        // Sorting
        if (query.sort) {

            if (query.sort !== 'name' && query.sort !== 'marks') {
                res.writeHead(400);
                res.end(JSON.stringify({
                    error: "sort must be either name or marks"
                }));
                return;
            }

            const order = query.order || 'asc';

            if (order !== 'asc' && order !== 'desc') {
                res.writeHead(400);
                res.end(JSON.stringify({
                    error: "order must be either asc or desc"
                }));
                return;
            }

            result.sort((a, b) => {

                let comparison;

                if (query.sort === 'name') {
                    comparison = a.name.localeCompare(b.name);
                } else {
                    comparison = a.marks - b.marks;
                }

                return order === 'desc'
                    ? -comparison
                    : comparison;
            });
        }

        res.end(JSON.stringify(result));
    }

    // Main students route
    else if (pathName === '/students') {

        let result = students;

        // Course filter
        if (query.course) {
            result = result.filter(
                student =>
                    student.course.toLowerCase() === query.course.toLowerCase()
            );
        }

        // Minimum marks filter
        if (query.minMarks) {

            const minMarks = Number(query.minMarks);

            if (isNaN(minMarks)) {
                res.writeHead(400);
                res.end(JSON.stringify({
                    error: "minMarks must be a number"
                }));
                return;
            }

            result = result.filter(
                student => student.marks >= minMarks
            );
        }

        // Search filter
        if (query.search) {

            const searchText = query.search.toLowerCase();

            result = result.filter(
                student =>
                    student.name.toLowerCase().includes(searchText)
            );
        }

        // Sorting
        if (query.sort) {

            if (query.sort !== 'name' && query.sort !== 'marks') {
                res.writeHead(400);
                res.end(JSON.stringify({
                    error: "sort must be either name or marks"
                }));
                return;
            }

            const order = query.order || 'asc';

            if (order !== 'asc' && order !== 'desc') {
                res.writeHead(400);
                res.end(JSON.stringify({
                    error: "order must be either asc or desc"
                }));
                return;
            }

            result.sort((a, b) => {

                let comparison;

                if (query.sort === 'name') {
                    comparison = a.name.localeCompare(b.name);
                } else {
                    comparison = a.marks - b.marks;
                }

                return order === 'desc'
                    ? -comparison
                    : comparison;
            });
        }

        res.end(JSON.stringify(result));
    }

    // Unknown route
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