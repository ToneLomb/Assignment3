SELECT Firstname,Lastname,Age,name as 'Club''s name' from students join clubs on students.ClubID = Clubs.clubID where clubs.sport = "Swimming";
SELECT Firstname,Lastname,Age,Topic,duration as 'Course duration',School.name as 'School name' from Students JOIN courses on Courses.CourseId = Students.CourseId JOIN School on School.SchoolID = Students.SchoolID where School.name="UCI";
SELECT City, clubs.name as 'Club''s name',Sport from clubs JOIN school on clubs.SchoolID = School.SchoolID where school.name = "UCI";
SELECT * from Students where age between 20 and 22;