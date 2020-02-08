<?php
require_once ('fuzeWebservice.php');
require_once ('fuzeAuxMethods.php');

$formData = captureData();

$recordId = $formData['RecordId'];

$orgRecordResult = vtws_convertleads2($recordId, $formData);
$updateArray = array(
    $orgRecordResult['Accounts'], $formData['Username'].'@fuzeconnect.net.au', $formData['Promo Code']);
vtws_updateaccounts2($updateArray);
$serviceResult =  sendServiceEmail($formData);
emailCustomerConfirmation($formData);

$response = null;

if(true == $serviceResult['boolean']){
    $response = getSuccessString($formData['First Name']);
} 
else{
    $response = getFailureString();
}


?>
<html>
    <head>
        <title>Your application has been submitted</title>
        <style>
            #fuze-success, h4 {position:relative; float:left; width:100%; text-align:center; padding:70px 0;}
        </style>
    </head>
    <body>
        <?php echo $response;?>
    </body>
</html>