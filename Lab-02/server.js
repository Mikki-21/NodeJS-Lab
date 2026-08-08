const http = require("http");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {

    if (req.url === "/" && req.method === "GET") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end(
            "Welcome to my Node.js Server!\n" +
            "Name: Mikki Jaiswal\n" +
            "Scholar Number: 23145027\n" +
            "Course: BCA"
        );
    }

    else if (req.url === "/about" && req.method === "GET") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end(
            "Hello! I am a BCA student learning Node.js and backend development."
        );
    }

    else if (req.url === "/college" && req.method === "GET") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end(
            "College: Dev Sanskriti Vishwavidyalaya\n" +
            "Semester: 6th Semester"
        );
    }

    else if (req.url === "/profile" && req.method === "GET") {
        const profile = {
            name: "Mikki Jaiswal",
            scholarNumber: "23145027",
            course: "BCA",
            semester: "6th Semester",
            college: "Dev Sanskriti Vishwavidyalaya"
        };

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(profile));
    }

    else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Page Not Found");
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});