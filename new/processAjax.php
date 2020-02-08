<?php
session_start();
require_once ('fuzeWebservice.php');
require_once ('fuzeAuxMethods.php');

if (isset($_REQUEST['page1']) && !isset($_REQUEST['uname'])) {
    $firstname = ucfirst(fuzeStripTag($_REQUEST['fname']));
    $surname = ucfirst(fuzeStripTag($_REQUEST['lname']));
    $home_phone = fuzeStripTag($_REQUEST['phone']);
    $mobile_phone = fuzeStripTag($_REQUEST['mob']);
    $email = fuzeStripTag($_REQUEST['email']);
    $Unit_number = fuzeStripTag($_REQUEST['unitNum']);
    $street_number = fuzeStripTag($_REQUEST['streetNum']);
    $street_name = ucfirst(fuzeStripTag($_REQUEST['streetN']));
    $address_surburb = ucfirst(fuzeStripTag($_REQUEST['city']));
    $stateSelected = fuzeStripTag($_REQUEST['state']);
    $address_postcode = fuzeStripTag($_REQUEST['pcode']);

    $fullStreetName = $street_number . " " . $street_name;
    $orderDate = date("Y-m-d");
    $fullName = $firstname . ' ' . $surname;

    //Lead Creation on page 1
    $vTiger1 = array($firstname, $surname, $home_phone, $mobile_phone, $email,
        $Unit_number, $fullStreetName, $fullStreetName, $address_surburb,
        $stateSelected, $address_postcode, "Australia", $orderDate, "FUZEconnect",
        $fullName);

    $recordid = vtws_createleads_page1($vTiger1); //returns recordid of new lead created

    $_SESSION['recordId'] = $recordid;
    echo $recordid;
}


if (isset($_REQUEST['vid'])) {
    $recordid = $_SESSION['recordId'];
    $serviceUsername = $_REQUEST['uname'];
    
    $InternetPlanNumber = checkPlan($_REQUEST['intPlan']);
    $routerOption = checkRouter($_REQUEST['router']);
    $VoipPlanNumber = checkPlan($_REQUEST['phPlan']);
    $numToPort = $_REQUEST['numPort'];
    $InternetContract = checkContract($_REQUEST['ddlContract']);
    $password = randomPassword();
    
    if ("33" == $_REQUEST['intPlan']){
        $InternetPlanNumber = "Unlimited ADSL2+Phone";
        $VoipPlanNumber = "FUZEtalk Unlimited";
    }
//Lead Update in page 2
    $vTiger2 = array($serviceUsername.'@fuzeconnect.net.au', $InternetPlanNumber, $routerOption,
        $VoipPlanNumber, $InternetContract, $numToPort, $password);
    $recordId = vtws_updateleads_page2($recordid, $vTiger2);
    echo $recordId;
}

?>
