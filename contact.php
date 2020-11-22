<?php
    if($_POST["submit"]){
        $recipient = "1shylord0@gmail.com";
        $subject = "Form to email message";
        $senderName = $_POST["senderName"];
        $senderEmail = $_POST["senderEmail"];
        $message = $_POST["message"];

        $mailBody = "Name : $sender\nEmail : $senderEmail\n\n$message";

        mail($recipient, $subject, $mailBody, "From : $senderName $senderEmail");

        $thankYou = "Thank you! Your message has been sent."
    }


?>


<?=$thankYou ?>

