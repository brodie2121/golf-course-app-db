create table DailyJobBoard (
    id serial primary key,
    date varchar(100),
    firstJob varchar(1000),
    comments text,
    secondJob varchar(1000),
    commentsSecondJob text,
    employee_id integer references employee(id)
);

create table Employee (
    id serial primary key,
    firstName varchar(100),
    lastName varchar(200),
    phoneNumber integer,
    email varchar(1000),
    experience varchar(1000),
    dateStarted varchar(100)
);

create table sprayChart (
    id serial primary key,
    dateApplied varchar(100),
    employee_id integer references employee(id),
    holesTreated varchar(1000),
    lengthOfCutTreated varchar(1000),
    chemicalsBeingUsed text,
    rateApplied varchar(100),
    gallonsPerTank varchar(100),
    sprayRig varchar(1000),
    pestOrDiseasedControlled varchar(1000)
);

