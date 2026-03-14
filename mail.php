<?php

require_once('phpmailer/PHPMailerAutoload.php');

$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

$name = isset($_POST['fullName']) ? trim($_POST['fullName']) : '';
$phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$selectedProducts = isset($_POST['selectedProducts']) ? trim($_POST['selectedProducts']) : '';

$nameSafe = htmlspecialchars($name, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
$phoneSafe = htmlspecialchars($phone, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
$emailSafe = htmlspecialchars($email, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
$selectedProductsHtml = $selectedProducts !== ''
    ? nl2br(htmlspecialchars($selectedProducts, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'))
    : 'Не выбраны';

//$mail->SMTPDebug = 3;

$mail->isSMTP();
$mail->Host = 'smtp.gmail.com';
$mail->SMTPAuth = true;
$mail->Username = 'popovdanila054@gmail.com';
$mail->Password = 'efch kdml aqxt jlmg';
$mail->SMTPSecure = 'tls';
$mail->Port = 587;

$mail->setFrom('popovdanila054@gmail.com');
$mail->addAddress('popovdanila054@gmail.com');
$mail->isHTML(true);

$mail->Subject = 'Заявка с сайта';
$mail->Body = 'Оставлена новая заявка:<br><br>'
    . 'ФИО: ' . $nameSafe . '<br>'
    . 'Телефон: ' . $phoneSafe . '<br>'
    . 'Почта: ' . $emailSafe . '<br><br>'
    . 'Выбранные товары:<br>' . $selectedProductsHtml;
$mail->AltBody = '';

if (!$mail->send()) {
    echo 'Error';
} else {
    header('location: complete.html');
}
?>
