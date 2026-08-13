# NodeJS-Lab

## Lab Number: 04

## Lab Title

Advanced Search, Filter and Sort API

## Date

13 August 2026

## Student Details

- Name: Mikki Jaiswal
- Scholar Number: 23145027
- Course: BCA
- Semester: 6th Semester
- College: Dev Sanskriti Vishwavidyalaya

## Objective

The objective of this lab is to build an advanced Node.js API that can filter, search, and sort student data using query parameters. The API also validates invalid input and supports a dynamic course route.

## Technologies Used

- Node.js
- JavaScript
- Core HTTP Module
- VS Code
- Git
- GitHub

## Student Data

The server contains 8 students with the following fields:

- ID
- Name
- Course
- Marks

## API Routes and Query Parameters

### 1. All Students

```text
/students
Course Filter
/students?course=BCA
Minimum Marks Filter
/students?minMarks=60
Search
/students?search=an
Sort by Marks
/students?sort=marks&order=desc
Sort by Name
/students?sort=name&order=asc
Combined Filtering and Sorting
/students?course=BCA&minMarks=60&search=a&sort=marks&order=desc
Bonus Course Route
/students/course/BCA?minMarks=60&sort=marks&order=desc

How req.url.split() Works

The split() method divides the URL path into separate parts using / as the separator. For example, /students/course/BCA becomes ["", "students", "course", "BCA"], so index [3] gives the course name BCA.

Input Validation

The server validates minMarks and returns HTTP status 400 if it is not a valid number. It also validates the sort and order values and returns a clear JSON error message for invalid values.