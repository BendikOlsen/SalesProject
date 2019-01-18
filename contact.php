<?php

// an email address that will be in the From field of the email.
$from = 'post@sorinvest.no';

// an email address th$fields = array('firstname' => 'Name', 'lastname' => 'Surname', 'phone' => 'Phone', 'email' => 'Email', 'message' => 'Message', 'brand' => 'Bilmerke', 'kilometers'=>'Kilometerstand','regnumber' => 'Registeringsnummer'); at will receive the email with the output of the form
$sendTo = 'post@sorinvest.no';

// subject of the email
$subject = 'Ny melding fra sorinvest.no';

// form field names and their translations.
// array variable name => Text to appear in the email
$fields = array('name' => 'Navn', 'surname' => 'Etternavn', 'phone' => 'Telefonnummer', 'email' => 'Email', 'message' => 'Beskjed', 'brand' => 'Bilmerke', 'kilometer' => 'Kilometerstand', 'regnumber'=>'Registreringsnummer'); 

// SENDING
try
{
    if(count($_POST) == 0) throw new \Exception('Form is empty');
            
    $emailText = "Du har mottatt en ny beskjed fra sorinvest.no\n=============================\n";

    foreach ($_POST as $key => $value) {
        // If the field exists in the $fields array, include it in the email 
        if (isset($fields[$key])) {
            $emailText .= "$fields[$key]: $value\n";
        }
    }

    // All the neccessary headers for the email.
    $headers = array('Content-Type: text/plain; charset="UTF-8";',
        'From: ' . $from,
        'Reply-To: ' . $from,
        'Return-Path: ' . $from,
    );
    
    // Send email
    mail($sendTo, $subject, $emailText, implode("\n", $headers));

    $responseArray = array('type' => 'success', 'message' => $okMessage);
}
catch (\Exception $e)
    {
        $responseArray = array('type' => 'danger', 'message' => $errorMessage);
    }


// if requested by AJAX request return JSON response
if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
    $encoded = json_encode($responseArray);

    header('Content-Type: application/json');

    echo $encoded;
}
// else just display the message
else {
    echo $responseArray['message'];
}
?>