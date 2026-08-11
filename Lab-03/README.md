# NodeJS-Lab – Lab 03

## Lab Number

03

## Lab Title

Dynamic Student Directory and Movie API

## Student Name

Mikki Jaiswal

## Scholar Number

23145027

## Course

BCA

## Semester

6th Semester

## College

Dev Sanskriti Vishwavidyalaya

## Objective

In this lab, I learned how to create dynamic routes in a Node.js HTTP server. I used values from the URL to find specific students and movies from arrays. I also practiced JavaScript array methods such as `find()` and `filter()`. The lab also helped me understand how to handle invalid IDs and return appropriate 404 and 400 status codes.

## Student Routes

| Route | Description |
|---|---|
| `/students` | Returns the complete list of 12 students |
| `/students/1` | Returns the student with ID 1 |
| `/students/2` | Returns the student with ID 2 |
| `/students/99` | Returns "Student not found" |
| `/students/course/BCA` | Returns only students from the BCA course |
| `/students/abc` | Returns an error because the student ID must be a number |

## Movie Routes

| Route | Description |
|---|---|
| `/items` | Returns the complete list of 5 movies |
| `/items/1` | Returns the movie with ID 1 |
| `/items/3` | Returns the movie with ID 3 |
| `/items/99` | Returns "Movie not found" |
| `/items/abc` | Returns an error because the movie ID must be a number |

## Array Methods Used

### find()

The `find()` method searches the array and returns the first item that matches the given ID.

### filter()

The `filter()` method is used in `/students/course/BCA` to return only the students whose course is BCA.

## Understanding req.url.split()

`req.url.split('/')` breaks the URL into separate parts using `/`, which helps us extract the ID from routes such as `/students/1`.

For example:

`/students/1`

becomes:

`["", "students", "1"]`

So `req.url.split('/')[2]` gives us the ID `1`.

## Status Codes

- **200** – Request was successful.
- **400** – Invalid ID was provided, such as `/students/abc`.
- **404** – Requested student, movie, or route was not found.

## Files

- `students-server.js` – Node.js server containing student and movie routes
- `students-output.png` – Screenshot of student routes
- `items-output.png` – Screenshot of movie routes
- `README.md` – Lab documentation

## How to Run

Open the terminal inside the Lab-03 folder and run:

```bash
node students-server.js