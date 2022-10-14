CREATE TABLE STUDENTS (StudentID varchar(20) primary key, Firstname varchar(20) not null, Lastname varchar(20) not null, age smallint not null, SchoolID varchar(20) not null, ClubID varchar(20), CourseID varchar(20));
CREATE TABLE SCHOOL (SchoolID varchar(20) primary key, Name varchar(50) not null, City varchar(20) not null, score smallint not null);
CREATE TABLE CLUBS (ClubID varchar(20) primary key, Name varchar(20) not null, Sport varchar(20) not null, SchoolID varchar(20) not null, constraint  SchoolID_FK foreign key (SchoolID) references School (SchoolID));
CREATE TABLE COURSES (CourseID varchar(20) primary key, Topic varchar(40) not null, Description varchar(50) not null, duration time not null);

ALTER TABLE STUDENTS ADD CONSTRAINT Student_SchoolID_FK foreign key (SchoolID) references School (SchoolID);
ALTER TABLE STUDENTS ADD CONSTRAINT  ClubID_FK foreign key (ClubID) references Clubs (ClubID);
ALTER TABLE STUDENTS ADD CONSTRAINT CourseID_FK foreign key (CourseID) references courses (CourseID);