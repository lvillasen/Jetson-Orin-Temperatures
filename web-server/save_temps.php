<?php
// Conexión a la base de datos MySQL
$servername = "localhost";
$username = "XXXXXXXX";
$password = "XXXXXX";
$dbname = "XXXXX";

// Crear la conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Función auxiliar para convertir cadenas vacías a NULL en SQL
function to_sql_value($val) {
    if ($val === '' || is_null($val)) return "NULL";
    return "'" . addslashes($val) . "'";
}

// Verificar si los datos fueron enviados por POST
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $date_time = $_POST['date_time'];
    $CPU       = $_POST['CPU'];
    $Tboard    = $_POST['Tboard'];
    $SOC2      = $_POST['SOC2'];
    $Tdiode    = $_POST['Tdiode'];
    $SOC0      = $_POST['SOC0'];
    $GPU       = $_POST['GPU'];  // Puede estar vacío o malformado
    $tj        = $_POST['tj'];
    $SOC1      = $_POST['SOC1'];
    $datetime  = date('Y-m-d H:i:s');

    $sql = "INSERT INTO jetson_temps (
        date_time, CPU, Tboard, SOC2, Tdiode, SOC0, GPU, tj, SOC1, date_time_rec
    ) VALUES (
        " . to_sql_value($date_time) . ",
        " . to_sql_value($CPU) . ",
        " . to_sql_value($Tboard) . ",
        " . to_sql_value($SOC2) . ",
        " . to_sql_value($Tdiode) . ",
        " . to_sql_value($SOC0) . ",
        " . to_sql_value($GPU) . ",
        " . to_sql_value($tj) . ",
        " . to_sql_value($SOC1) . ",
        " . to_sql_value($datetime) . "
    )";

    // Ejecutar la consulta
    if ($conn->query($sql) === TRUE) {
        echo "Data saved successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
} else {
    echo "No data received";
}

$conn->close();
?>
