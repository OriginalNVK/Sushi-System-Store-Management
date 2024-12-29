USE SUSHISTORE_MANAGEMENT
GO

INSERT INTO BRANCH (
    BranchID, 
    BranchName, 
    BranchAddress, 
    OpenHour, 
    CloseHour, 
    PhoneNumber, 
    HasCarParking, 
    HasMotorParking, 
    AreaID, 
    ManagerID, 
    HasDeliveryService
)
SELECT 
    BranchID, 
    BranchName, 
    BranchAddress, 
    OpenHour, 
    CloseHour, 
    PhoneNumber, 
    HasCarParking, 
    HasMotorParking, 
    AreaID, 
    ManagerID, 
    HasDeliveryService
FROM BRANCH$;

INSERT INTO ORDER_ONLINE (
    OnOrderID,
    BranchID,
    DateOrder,
    TimeOrder,
    AmountCustomer,
    Note
)
SELECT 
    OnOrderID,
    BranchID,
    DateOrder,
    TimeOrder,
    AmountCustomer,
    Note
FROM order_online_data$;

-- Cập nhật ManagerID với các giá trị từ 101 đến 115
UPDATE BRANCH
SET ManagerID = CASE 
    WHEN BranchID = 8 THEN 10
    WHEN BranchID = 10 THEN 12
    WHEN BranchID = 2 THEN 14
    WHEN BranchID = 9 THEN 16
    WHEN BranchID = 5 THEN 18
    WHEN BranchID = 15 THEN 30
    WHEN BranchID = 7 THEN 36
    WHEN BranchID = 12 THEN 56
    WHEN BranchID = 1 THEN 61
    WHEN BranchID = 11 THEN 67
	WHEN BranchID = 3 THEN 85
	WHEN BranchID = 6 THEN 101
    WHEN BranchID = 4 THEN 109
    WHEN BranchID = 13 THEN 153
    WHEN BranchID = 14 THEN 315
    ELSE ManagerID
END;