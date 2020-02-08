<?php
require_once ("class.phpmailer.php");

// TO UPDATE AVAILABLE PLANS OR CONTRACT OPTIONS EDIT THIS FILE ACCORDINGLY

define("IS_TESTING", true);

/* checkContract checks to see what contract option
 * was selected on the internet application form
 * @param (string)
 * @return(string)
 */
function checkContract($aContract) {
    if (null == $aContract) {
        return null;
    } else {
        $myContract = "none";
        switch ($aContract) {
            case "601":
                $myContract = "24 Month Contract";
                break;
            case "602":
                $myContract = "12 Month Contract ";
                break;
            case "603":
                $myContract = "6 Month Contract ";
                break;
            case "604":
                $myContract = "0 Month - No Contract ";
                break;
            case "605":
                $myContract = "24 Month Contract ";
                break;
            case "606":
                $myContract = "12 Month Contract ";
                break;
            case "607":
                $myContract = "6 Month Contract ";
                break;
            case "608":
                $myContract = "0 Month - No Contract ";
                break;
            case "611":
                $myContract = "24 Month ADSL2+ Contract ";
                break;
            case "612":
                $myContract = "12 Month ADSL2+ Contract ";
                break;
            case "613":
                $myContract = "6 Month ADSL2+ Contract ";
                break;
            case "614":
                $myContract = "0 Month - ADSL 2+ No Contract ";
                break;
            case "615":
                $myContract = "Existing customer transfer ";
                break;
            case "617":
                $myContract = "24 Month Phone Only Contract ";
                break;
            case "618":
                $myContract = "12 Month Phone Only Contract ";
                break;
            case "619":
                $myContract = "6 Month Phone Only Contract ";
                break;
            case "621":
                $myContract = "0 Month Contract FREE SETUP - Limited Time Only ";
                break;
            default:
                $myContract = "Invalid Selection";
                break;
        }
        return $myContract;
    }
}

/* checkProduct checks what network type has been selected
 * from the internet application
 * @param (string)
 * @return(string)
 */

function checkProduct($netType) {
    if (null == $netType) {
        return null;
    } else {
        $myProd = "none";
        switch ($netType) {
            case "1":
                $myProd = "None";
                break;
            case "2":
                $myProd = "Fibre / Ethernet";
                break;
            case "3":
                $myProd = "Cable";
                break;
            case "4":
                $myProd = "VDSL / EOC";
                break;
            case "5":
                $myProd = "ADSL2+";
                break;
            case "6":
                $myProd = "Naked Adsl2+";
                break;
            case "7":
                $myProd = "On Net ADSL2+";
                break;
            default:
                $myProd = "Mo match Found";
                break;
        }
        return $myProd;
    }
}

/*
 * checkPlan checks what Internet or phone plan has been selected
 * @param (string)
 * @return(string)
 */

function checkPlan($aPlan) {
    if (null == $aPlan) {
        return null;
    } else {
        $myPlan = null;
        switch ($aPlan) {
            case "1":
                $myPlan = "FUZEnet 100";
                break;
            case "2":
                $myPlan = "FUZEnet 200";
                break;
            case "3":
                $myPlan = "FUZEnet 300";
                break;
            case "4":
                $myPlan = "FUZEnet 500";
                break;
            case "5":
                $myPlan = "FUZEnet 1000";
                break;
            case "16":
                $myPlan = "Naked ADSL2+100GB";
                break;
            case "17":
                $myPlan = "Naked ADSL2+200GB";
                break;
            case "18":
                $myPlan = "Naked ADSL2+500GB";
                break;
            case "19":
                $myPlan = "Naked ADSL2+1000GB";
                break;
            case "20":
                $myPlan = "ADSL2+100GB";
                break;
            case "21":
                $myPlan = "ADSL2+200GB";
                break;
            case "22":
                $myPlan = "ADSL2+500GB";
                break;
            case "23":
                $myPlan = "ADSL2+1000GB";
                break;
            case "25":
                $myPlan = "Naked ADSL2+50GB";
                break;
            case "26":
                $myPlan = "Local Net ADSL2+ 50GB";
                break;
            case "501":
                $myPlan = "FUZEtalk Access";
                break;
            case "502":
                $myPlan = "FUZEtalk Unlimited";
                break;
            case "504":
                $myPlan = "FUZEtalk Max";
                break;
            case "30":
                $myPlan = "HFC Unlimited Cable";
                break;
            case "31":
                $myPlan = "ADSL2+ 100";
                break;
            case "32":
                $myPlan = "Unlimited ADSL2+";
                break;
            case "33":
                $myPlan = array("bundle"=>true, 'Internet'=>'Unlimited ADSL2+Phone', 'Phone'=>"FUZEtalk Unlimited");
                break;
            case "35":
                $myPlan = "HFC 100 Cable";
                break;
            default:
                $myPlan = "No";
                break;
        }
        return $myPlan;
    }
}

/* checkServices checks what services have been selected on 
 * the internet application
 * @param (string)
 * @return(string)  
 */

function checkServices($aService) {
    if (null == $aService) {
        return null;
    } else {
        $myService = null;
        switch ($aService) {
            case "1":
                $myService = "No Selection";
                break;
            case "2":
                $myService = "Internet and Phone";
                break;
            case "3":
                $myService = "Internet Only";
                break;
            case "4":
                $myService = "Phone Only";
                break;
            default:
                $myService = "Mo Match Found";
                break;
        }
        return $myService;
    }
}

/* checkPorting checks to see if the customer has asked
 * for a number to be ported
 * @param (string)
 * @return(string) 
 */

function checkPorting($radOption) {
    if (null == $radOption) {
        return null;
    } else {
        if ($radOption == 1)
            return "Yes";
        else
            return "No";
    }
}

/* checkRouter checks to see if any equipment has been requested
 * @param (string)
 * @return(string) 
 */

function checkRouter($aRouter) {
    if (null == $aRouter) {
        return null;
    } else {
        $myRouter = "none";
        switch ($aRouter) {
            case "1":
                $myRouter = "No";
                break;
            case "2":
                $myRouter = "Yes";
                break;
            default:
                $myRouter = "No Selection";
                break;
        }
        return $myRouter;
    }
}

/* fuzeStripTag strips any tags that might be in the form data 
 * and also trims any spaces in the the edges 
 * @param (string)
 * @return(string)
 */

function fuzeStripTag($anInput) {
    return strip_tags(trim($anInput));
}

/* captureData captures all the data on the webform (Fuzeapp.php)
 * @param(null)
 * @return(array)
 */

function captureData() {
    $formData = array(
        "First Name" => null,
        "Last Name" => null,
        "Home Number" => null,
        "Mobile Number" => null,
        "Email Address" => null,
        "Unit Number" => null,
        "Street Number" => null,
        "Street Name" => null,
        "Suburb" => null,
        "State" => null,
        "Postcode" => null,
        "Network Type" => null,
        "Services Required" => null,
        "RecordId" => null,
        "Username" => null,
        "Internet Plan" => null,
        "Port Speed"=> null,
        "Router Option" => null,
        "Phone Plan" => null,
        "Porting Option" => null,
        "Number to Port" => null,
        "Contract Option" => null,
        "Promo Code"=> null,
    );

    $formData["First Name"] = fuzeStripTag($_REQUEST["txtApplicantFirstName"]);
    $formData["Last Name"] = fuzeStripTag($_REQUEST["txtApplicantSurname"]);
    $formData["Home Number"] = fuzeStripTag($_REQUEST["txtApplicantHomePhone"]);
    $formData["Mobile Number"] = fuzeStripTag($_REQUEST["txtApplicantMobilePhone"]);
    $formData["Email Address"] = fuzeStripTag($_REQUEST["txtApplicantEmail"]);
    $formData["Unit Number"] = fuzeStripTag($_REQUEST["txtUnitNumber"]);
    $formData["Street Number"] = fuzeStripTag($_REQUEST["txtStreetNumber"]);
    $formData["Street Name"] = fuzeStripTag($_REQUEST["txtStreetName"]);
    $formData["Suburb"] = fuzeStripTag($_REQUEST["txtSurburb"]);
    $formData["Postcode"] = fuzeStripTag($_REQUEST["txtPostCode"]);
    $formData["Username"] = fuzeStripTag($_REQUEST["txtUsername"]);
    $formData["Number to Port"] = fuzeStripTag($_REQUEST["txtNumToPort"]);
    $formData["RecordId"] = fuzeStripTag($_REQUEST["vtiger"]);
    $formData["Promo Code"] = fuzeStripTag($_REQUEST["txtPromoCode"]);

    $formData["State"] = fuzeStripTag($_REQUEST["ddlState"]); //DDL 

    @$networkTypeNum = fuzeStripTag($_REQUEST["ddlNetType"]); //DDL        
    @$serviceReqNum = fuzeStripTag($_REQUEST["ddlservReq"]); //DDL     
    @$InternetPlanNumber = fuzeStripTag($_REQUEST["ddlPlanoption"]); //DDL
    @$routerNumber = fuzeStripTag($_REQUEST["ddlrouter"]); //DDL    
    @$phonePlanNumber = fuzeStripTag($_REQUEST["ddlVoipPlan"]); //DDL    
    @$InternetContractNumber = fuzeStripTag($_REQUEST["ddlContract"]); //DDL
    @$PhonePorting = fuzeStripTag($_REQUEST["radNumPort"]); //RAD OPTION

    $formData["Network Type"] = checkProduct($networkTypeNum);
    $formData["Services Required"] = checkServices($serviceReqNum);
    $formData["Internet Plan"] = checkPlan($InternetPlanNumber);
    
    $formData["Router Option"] = checkRouter($routerNumber);
    $formData["Phone Plan"] = checkPlan($phonePlanNumber);
    $formData["Porting Option"] = checkPorting($PhonePorting);
    $formData["Contract Option"] = checkContract($InternetContractNumber);
    
    if($InternetPlanNumber == "4"){
        $formData["Port Speed"] = "No Internet";
    }
    else{
        $formData["Port Speed"] = fuzeStripTag($_REQUEST["radPortSpeed"]);
    }
    if($InternetPlanNumber == "33"){
        $formData["Internet Plan"] = "Unlimited ADSL2+";
        $formData["Phone Plan"] = "FUZEtalk Unlimited";
    }

    return $formData;
}

/* formatStreetAddress formats the unit number, street Name and street Number into one string 
 * @param(string, string, string)
 * @return(string)
 */

function formatStreetAddress($unitNumber, $streetNumber, $streetName) {
    if ($unitNumber != "") {
        return $unitNumber . " / " . $streetNumber . " " . $streetName;
    } else {
        return $streetNumber . " " . $streetName;
    }
}

/* FormatEmail formats the email to prepare it to be sent to the service Team
 * @param (array)
 * @return(string)
 */

function formatEmail($data) {

    $formatedStreetName = formatStreetAddress($data["Unit Number"], $data["Street Number"], $data["Street Name"]);

    $htmlEmail = "<h2>FUZEnet Application</h2>";

    $htmlEmail .= "<h3>Personal Details</h3>";
    $htmlEmail .= "<strong>Name: </strong>" . $data['First Name'] . " " . $data['Last Name'] . "<br/>";
    $htmlEmail .= "<strong>Mobile Number: </strong>" . $data['Mobile Number'] . "<br/>";
    $htmlEmail .= "<strong>Home Number: </strong>" . $data['Home Number'] . "<br/>";
    $htmlEmail .= "<strong>Email: </strong>" . $data['Email Address'] . "<br/> <br/>";

    $htmlEmail .= "<h3> Address Details</h3>";
    $htmlEmail .= "<strong>Street Address: </strong>" . $formatedStreetName . "<br/>";
    $htmlEmail .= "<strong>Suburb: </strong>" . $data['Suburb'] . "<br/>";
    $htmlEmail .= "<strong>State: </strong>" . $data['State'] . "<br/>";
    $htmlEmail .= "<strong>Postcode: </strong>" . $data['Postcode'] . "<br/><br/>";

    $htmlEmail .= "<h3> Service Details</h3>";
    $htmlEmail .= "<strong>Network Type: </strong>" . $data['Network Type'] . "<br/>";
    $htmlEmail .= "<strong>Service required: </strong>" . $data['Services Required'] . "<br/>";

    if ('Internet and Phone' == $data['Services Required'] || 'Internet Only' == $data['Services Required']) {
        $htmlEmail .= "<strong>Desired Username: </strong>" . $data['Username'] . "@fuzenet.com.au <br/>";
        $htmlEmail .= "<strong>Internet Plan: </strong>" . $data['Internet Plan'] . "<br/>";
        $htmlEmail .= "<strong>Port Speed: </strong>" . $data['Port Speed'] . "<br/>";
        $htmlEmail .= "<strong>Router Required: </strong>" . $data['Router Option'] . "<br/>";
    }

    if ('Internet and Phone' == $data['Services Required'] || 'Phone Only' == $data['Services Required']) {
        $htmlEmail .= "<strong>Phone Plan: </strong>" . $data['Phone Plan'] . "<br/>";
        $htmlEmail .= "<strong>Number Porting Required? </strong>" . $data['Porting Option'] . "<br/>";

        if ('Yes' == $data['Porting Option']) {
            $htmlEmail .= "<strong>Number to be Ported: </strong>" . $data['Number to Port'] . "<br/>";
        }
    }

    $htmlEmail .= "<strong>Contract Option: </strong>" . $data['Contract Option'] . "<br/><br/>";
    
    if(null == $data['Promo Code'] || "" == $data['Promo Code']){
        $htmlEmail .= "<strong>Promo Code: </strong>" . $data['Promo Code'] . "<br/><br/>";
    }

    $htmlEmail .= "<h2>Declaration</h2>";
    $htmlEmail .= "<p>" . $data['First Name'] . " has read and understood the terms and conditions set out by FUZEnet</p><br/><br/>";

    return $htmlEmail;
}

/* sendServiceEmail sends an email from the Service Team 
 * as a pre caution if anything went wrong with the vtiger submission
 * @param (array)
 * @return (bool)
 */

function sendServiceEmail($filterdData) {

    $fullName = $filterdData['First Name'] . " " . $filterdData['Last Name'];
    $emailFrom = $filterdData['Email Address'];
    $emailSubject = "FUZEnet Application from " . $fullName;
    $emailContent = formatEmail($filterdData);

    $fuzeApp = new PHPMailer();
    
    if(IS_TESTING)
        $fuzeApp->AddAddress("bobadmin@e-wire.net.au", "Service Team");
    else{ 
        $fuzeApp->AddAddress("service@fuzeconnect.com.au", "Service Team"); //service@fuzeconnect.com.au
        $fuzeApp->AddBCC("rowanm@selements.com.au", "FUZEnet Manager" );
        $fuzeApp->AddBCC("bobadmin@e-wire.net.au", "FUZEnet Admin");
    }
    
    
    $fuzeApp->Subject = $emailSubject;
    $fuzeApp->SetFrom($emailFrom, $fullName);
    
    $fuzeApp->MsgHTML($emailContent);

    $emailResult = $fuzeApp->Send();

    return array("boolean" => $emailResult, "ErrorMessage" => $fuzeApp->ErrorInfo);
}

/* After the email to the service team is sent we will send an introduction email 
 * to the customer confirming that the application has been received
 * @param (array)
 * @return (bool)
 */

function emailCustomerConfirmation($filterdData) {

    $fullName = $filterdData['First Name'] . " " . $filterdData['Last Name'];
    $customerEmailSubject = "Welcome to FUZEnet " . $filterdData['First Name'];
    $customerEmailContent = composeCustomerEmail($filterdData);


    $customerEmail = new PHPMailer();

    $customerEmail->AddAddress($filterdData["Email Address"], $fullName);
    $customerEmail->Subject = $customerEmailSubject;
    $customerEmail->SetFrom("service@fuzeconnect.com.au", "FUZEnet Service Team");
    $customerEmail->MsgHTML($customerEmailContent);

    return $customerEmail->Send();
}

/* composes an email to send to the customer as a confirmation 
 * that their application has been submitted and has gotten to the fuze team
 * @param (array)
 * @return (string)
 */

function composeCustomerEmail($data) {
    $customerEmail = '
<!DOCTYPE html>
<html>
    <head>
        <title>Confirmation Email</title>
        <style>
            body{margin: 0; padding: 5px;}
            #customerEmailContent {width: 640px; }
            #customerEmailTable{width: 600px;}
            #customerEmailHeader{color: #8BC53F; font-size: 1.6em}
            #customerEmailFooter{color: #8BC53F; font-size: 1.1em}
            #customerUsername{font-weight: 600;}
            #smallPrint{font-size: 0.6em}
        </style>
    </head>
    <body>
        <div id="customerEmailContent">
        <table id="customerEmailTable">
            <tr><th id="customerEmailHeader">
                    Welcome to FUZEnet
            </th></tr>
            <tr><td>
                    <p>
                        Dear ' . $data["First Name"] . '<br/><br/>                        
                        Your application has been received by the Service Team 
                        who will be in touch soon regarding your application 
                        and to advise what the next step is.
                    </p>
             </td></tr>
            <tr><td>
                <table id="serviceSummary">
                    <tr>
                        <th>Service Summary</th>
                    </tr>
                    <tr>
                        <td>Services Requested:&nbsp;&nbsp;</td>
                        <td>'.$data["Services Required"].'</td>
                    </tr>
                    <tr>
                        <td>Username:&nbsp;&nbsp;</td>
                        <td>'.$data["Username"].'</td>
                    </tr>
                    <tr>
                        <td>Internet Plan:&nbsp;&nbsp;</td>
                        <td>'.$data["Internet Plan"].'</td>
                    </tr>
                    <tr>
                        <td>Port Speed:&nbsp;&nbsp;</td>
                        <td>'.$data["Port Speed"].'</td>
                    </tr>
                    <tr>
                        <td>Phone Plan:&nbsp;&nbsp;</td>
                        <td>'.$data["Phone Plan"].'</td>
                    </tr>
                    <tr>
                        <td>Contract Option:&nbsp;&nbsp;</td>
                        <td>'.$data["Contract Option"].'</td>
                    </tr>';
    if($data["Promo Code"] != null || $data["Promo Code"] != ""){
        $customerEmail .= '<tr>
                        <td>Promo Code:&nbsp;&nbsp;</td>
                        <td>'.$data["Promo Code"].'</td>
                    </tr>';
    }
    
            $customerEmail.= '</table>
            </td></tr>
            <tr><td>
                    <p id="customerEmailFooter"> Kind Regards, <br/> <br/>
                        <img src="https://www.fuzeconnect.com.au/wp-content/uploads/2013/11/fuze_logo_small.gif"
                             alt="FUZEnet"/><br/><br/>Customer Service Team</p><br/><br/>
                    <p id="smallPrint">If you receive this email by mistake, 
                        please notify us and do not make any use of the email.  
                        FUZEnet does not waive any privilege, confidentiality or copyright associated with this email.</p>
            </td></tr>
        </table>
        </div>
    </body>
</html>';

    return $customerEmail;
}

/*will be used to generate a random password on the fly as the application is processed
 * @param {void}
 * @return {string} pass
 */
function randomPassword() {
    $alphabet = "abcdefghijklmnopqrstuwxyz0123456789";
    $pass = null;
    for ($i = 0; $i < 8; $i++) {
        $n = rand(0, strlen($alphabet) - 1);
        $pass .= substr($alphabet, $n, 1);
    }
    return $pass;
}

/*will return the html used to show a successful application has been made
 * @param {string} firstname
 * @return {string} successPage
 */
function getSuccessString($firstname) {

    $successPage = null;
    $successPage .= "<h4>$firstname, your application has been submitted</h4>";
    $successPage .= "<br/><br/>";
    $successPage .= "<div id='fuze-success'>";
    $successPage .= "<img src='https://fuzeconnect.com.au/wp-content/uploads/2013/05/fuze-success.gif' alt='Your application has been submitted'>";
    $successPage .= "</div>";

    return $successPage;
}

/*will return the html used to show a failed application HAS BEEN MADE
 * @param {void} 
 * @return {string} failurePage
 */
function getFailureString() {

    $failurePage = ' <div id="fuze-success">';
    $failurePage .=' <img src="https://fuzeconnect.com.au/wp-content/uploads/2013/05/fuze-failure.gif" alt="Your application has not been processed">';
    $failurePage .=' </div>';

    return $failurePage;
}

?>
