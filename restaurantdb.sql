-- -- Create the User table to store customer or user data
-- CREATE TABLE IF NOT EXISTS User (
--   UserID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
--   Name TEXT,
--   HashPassword TEXT,
--   CreateAt DATETIME
-- );

-- -- Create the Table entity to represent tables in the restaurant
-- CREATE TABLE IF NOT EXISTS `Table` (
--   TableID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
--   TableNumber INT UNSIGNED,
--   IsAvailable BOOLEAN,
--   Ability INT
-- );

-- -- Create the Reservation table to manage table reservations
-- CREATE TABLE IF NOT EXISTS Reservation (
--   ReservationID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
--   TableNumber INT UNSIGNED,
--   UserID INT UNSIGNED,
--   Time DATETIME,
--   IsTaken BOOLEAN
-- );

-- -- Create the Menu table to store the available dishes
-- CREATE TABLE IF NOT EXISTS Menu (
--   DishID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
--   Name TEXT,
--   CategoryID INT UNSIGNED,
--   CookMethodID INT UNSIGNED,
--   Description TEXT,
--   Picture TEXT,
--   Price FLOAT,
--   IsAvailable BOOLEAN
-- );

-- -- Create the CategoryDish table to categorize the dishes
-- CREATE TABLE IF NOT EXISTS CategoryDish (
--   CategoryID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
--   Name TEXT,
--   Description TEXT
-- );

-- -- Create the CookMethod table to describe how dishes are cooked
-- CREATE TABLE IF NOT EXISTS CookMethod (
--   CookMethodID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
--   Name TEXT,
--   Description TEXT
-- );

-- -- Create the DishOrder table to track individual dish orders in a bill
-- CREATE TABLE IF NOT EXISTS DishOrder (
--   DishOrderID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
--   BillID INT UNSIGNED,
--   DishID INT UNSIGNED,
--   Number INT,
--   Note TEXT
-- );

-- -- Create the Bill table to handle payments
-- CREATE TABLE IF NOT EXISTS Bill (
--   BillID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
--   TableID INT UNSIGNED,
--   IsAvailable BOOLEAN,
--   TotalPrice FLOAT,
--   IsPayed BOOLEAN,
--   Time DATETIME
-- );

-- -- Create the Department table to represent departments in the organization
-- CREATE TABLE IF NOT EXISTS Department (
--   DepartmentID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
--   Name TEXT,
--   Description TEXT,
--   Icon TEXT
-- );

-- -- Create the Role table to define the different roles for staff
-- CREATE TABLE IF NOT EXISTS Role (
--   RoleID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
--   Name TEXT,
--   Description TEXT,
--   DepartmentID INT UNSIGNED,
--   FOREIGN KEY (DepartmentID) REFERENCES Department(DepartmentID)
-- );

-- -- Create the Staff table to represent staff members
-- CREATE TABLE IF NOT EXISTS Staff (
--   StaffID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
--   Name TEXT,
--   RoleID INT UNSIGNED,
--   Password TEXT,
--   CreateAt DATETIME,
--   FOREIGN KEY (RoleID) REFERENCES Role(RoleID)
-- );

-- -- Create the Feature table to describe features for roles
-- CREATE TABLE IF NOT EXISTS Feature (
--   FeatureID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
--   Name TEXT,
--   Description TEXT
-- );

-- -- Create the FeatureOfRole table to assign features to roles
-- CREATE TABLE IF NOT EXISTS FeatureOfRole (
--   FeatureOfRoleID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
--   RoleID INT UNSIGNED,
--   FeatureID INT UNSIGNED,
--   FOREIGN KEY (RoleID) REFERENCES Role(RoleID),
--   FOREIGN KEY (FeatureID) REFERENCES Feature(FeatureID)
-- );

-- -- Create the FeatureOfStaff table to assign features to staff members
-- CREATE TABLE IF NOT EXISTS FeatureOfStaff (
--   FeatureOfStaffID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
--   StaffID INT UNSIGNED,
--   FeatureID INT UNSIGNED,
--   FOREIGN KEY (StaffID) REFERENCES Staff(StaffID),
--   FOREIGN KEY (FeatureID) REFERENCES Feature(FeatureID)
-- );

-- -- Create the Salary table to track staff salaries
-- CREATE TABLE IF NOT EXISTS Salary (
--   StaffID INT UNSIGNED PRIMARY KEY,
--   Amount INT,
--   FOREIGN KEY (StaffID) REFERENCES Staff(StaffID)
-- );

-- -- Create the Shift table to track staff shifts
-- CREATE TABLE IF NOT EXISTS Shift (
--   ShiftID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
--   TimeStart DATETIME,
--   TimeEnd DATETIME
-- );

-- -- Create the ShiftOfStaff table to assign shifts to staff members
-- CREATE TABLE IF NOT EXISTS ShiftOfStaff (
--   ShiftOfStaffID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
--   ShiftID INT UNSIGNED,
--   StaffID INT UNSIGNED,
--   IsConfirm BOOLEAN,
--   IsAttendant BOOLEAN,
--   FOREIGN KEY (ShiftID) REFERENCES Shift(ShiftID),
--   FOREIGN KEY (StaffID) REFERENCES Staff(StaffID)
-- );

-- -- Add FOREIGN KEY constraints

-- ALTER TABLE Reservation
--   ADD CONSTRAINT FK_Table_Reservation FOREIGN KEY (TableNumber) REFERENCES `Table`(TableID),
--   ADD CONSTRAINT FK_User_Reservation FOREIGN KEY (UserID) REFERENCES User(UserID);

-- ALTER TABLE Menu
--   ADD CONSTRAINT FK_CategoryDish_Menu FOREIGN KEY (CategoryID) REFERENCES CategoryDish(CategoryID),
--   ADD CONSTRAINT FK_CookMethod_Menu FOREIGN KEY (CookMethodID) REFERENCES CookMethod(CookMethodID);

-- ALTER TABLE DishOrder
--   ADD CONSTRAINT FK_Bill_DishOrder FOREIGN KEY (BillID) REFERENCES Bill(BillID),
--   ADD CONSTRAINT FK_Menu_DishOrder FOREIGN KEY (DishID) REFERENCES Menu(DishID);

-- ALTER TABLE Bill
--   ADD CONSTRAINT FK_Table_Bill FOREIGN KEY (TableID) REFERENCES `Table`(TableID);

-- ALTER TABLE FeatureOfRole
--   ADD CONSTRAINT FK_Role_FeatureOfRole FOREIGN KEY (RoleID) REFERENCES Role(RoleID),
--   ADD CONSTRAINT FK_Feature_FeatureOfRole FOREIGN KEY (FeatureID) REFERENCES Feature(FeatureID);

-- ALTER TABLE FeatureOfStaff
--   ADD CONSTRAINT FK_Staff_FeatureOfStaff FOREIGN KEY (StaffID) REFERENCES Staff(StaffID),
--   ADD CONSTRAINT FK_Feature_FeatureOfStaff FOREIGN KEY (FeatureID) REFERENCES Feature(FeatureID);

-- ALTER TABLE Salary
--   ADD CONSTRAINT FK_Staff_Salary FOREIGN KEY (StaffID) REFERENCES Staff(StaffID);

-- ALTER TABLE ShiftOfStaff
--   ADD CONSTRAINT FK_Shift_ShiftOfStaff FOREIGN KEY (ShiftID) REFERENCES Shift(ShiftID),
--   ADD CONSTRAINT FK_Staff_ShiftOfStaff FOREIGN KEY (StaffID) REFERENCES Staff(StaffID);
