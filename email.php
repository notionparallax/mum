<?php 
	//returns this hash as json, then it can be reposted to the ui
    echo json_encode(array("body"=>$_POST["requestBody"]));
    
    
    //http://php.net/manual/en/function.mail.php
    // multiple recipients
$to  = 'irinabelova.jr@gmail.com';// . ', '; // note the comma
//$to .= 'wez@example.com';

// subject
$subject = 'Your request to Mum';

// message
$message = '
<html>
<head>
  <title>Your request to Mum</title>
</head>
<body>
  <p>Hi, Thanks for your request to Mum, more copy for Irina to design, after all she is the UX person etc.</p>
<p>Your request was:
<blockquote>' . $_POST["requestBody"] . '<blockquote>
<p>Thanks for testing mum blah blah blah</p>
</body>
</html>
';

// To send HTML mail, the Content-type header must be set
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

// Additional headers
$headers .= 'From: Mum <ben+mum@notionparallax.co.uk>' . "\r\n";
//$headers .= 'Cc: birthdayarchive@example.com' . "\r\n";
//$headers .= 'Bcc: birthdaycheck@example.com' . "\r\n";

// Mail it
mail($to, $subject, $message, $headers);
?>