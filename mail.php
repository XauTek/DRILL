<?php 

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

$name = $_POST['fullName'];
$phone = $_POST['phone'];
$email = $_POST['email'];

//$mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      
$mail->Host = 'smtp.gmail.com';  																							// Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               
$mail->Username = 'popovdanila054@gmail.com'; // Логин от почты с которой будут отправляться письма
$mail->Password = 'efch kdml aqxt jlmg'; // Пароль приложения
$mail->SMTPSecure = 'tls';                            
$mail->Port = 587; 

$mail->setFrom('popovdanila054@gmail.com'); //Откуда отпарвляются
$mail->addAddress('popovdanila054@gmail.com'); //Куда отправляются
$mail->isHTML(true);                                 

$mail->Subject = 'Заявка с сайта';
$mail->Body    = 'Оставлена новая заявка на звонок: <br>' .$name . ' оставил заявку. <br>Телефон: ' .$phone. '<br>Почта: ' .$email;
$mail->AltBody = '';

if(!$mail->send()) {
    echo 'Error';
} else {
    header('location: complete.html');
}
?>