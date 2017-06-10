<?php
$servername = null;
$username = "fd-admin";
$password = "fresh6017";
$dbname = "freshdesk";
$port = null;
$socket = "/cloudsql/freshdesk-alpha:asia-east1:freshdesk-sql";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname, $port, $socket);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
echo "Connected successfully";


// Change character set to utf8
mysqli_set_charset($conn,"utf8");

date_default_timezone_set('Asia/Bangkok');

if(!$_POST['location'])
$_POST['location']="NULL";

if(!$_POST['space'])
$_POST['space']="NULL";

$sql = "INSERT INTO buyer (action, title, need, location, name, phone, email, space, datetime) VALUES ('".$_POST['action']."','".$_POST['title']."','".$_POST['need']."',".$_POST['location'].",'".$_POST['name']."','".$_POST['phone']."','".$_POST['email']."',".$_POST['space'].",'".date("Y-m-d H:i:s",time())."')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
