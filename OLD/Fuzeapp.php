<?php
session_start();

if (isset($_GET['offNet'])) {
    $_SESSION = array();
}
var_dump($_SESSION);
require_once('auxSQ.php');
/*
  FUZEconnect Internet Service Application
  Developed By David B, Alice H, Robert K, Hanumantha  M
  V 2.3 24/01/2014
 * Suburb in the IDs is misspelt as surburb
 */
?>

<!DOCTYPE html>
<html>
    <head>    
        <link href="internet_application.css" rel="stylesheet" type="text/css" />
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js" type="text/javascript"></script>
        <script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.2/jquery-ui.min.js" type="text/javascript"></script>
        <script src="js/FuzeAjax.js" type='text/javascript'></script>
        <script src="js/FuzeHelper.js" type='text/javascript'></script>
        <script src="js/FuzeValidator.js" type='text/javascript'></script>
        <script src="js/FUZEconnect.js" type='text/javascript'></script>
        <style>
            a.link_main{ color:#000; text-decoration:none;}
        </style>
        <title>Application</title>

        
        <?php 
        $offnetApplication = "null";        $fuzeNetworkSq = "null";        $fuzeMaxSpeed = "null";
        //variable to describe if its a network issue
        if(isset($_GET['offNet']) && true == $_GET['offNet']) {$offnetApplication = "true";}else{$offnetApplication = "false";}
        //variable to describe the network type from the SQ
        if(isset($_SESSION['fuze_availability']))$fuzeNetworkSq = $_SESSION['fuze_availability']['connection_type'];
        //variable to describe the Maximum Speed
        if(isset($_SESSION['fuze_availability']))$fuzeMaxSpeed = $_SESSION['fuze_availability']['max_speed'];
        
        
        $fuzeappGlobalString = "<script type='text/javascript'> var offNetApplication = $offnetApplication; var fuzeNetworkSq = '$fuzeNetworkSq'; var fuzeMaxSpeed = '$fuzeMaxSpeed'; </script>";
        
        echo $fuzeappGlobalString;        
        ?>
    </head>

    <body>
        <div id="form-container">
            <h1 id="topic" class="form-title">FUZEconnect Service Application Form</h1>
            <form id="frmInternetApplication" method="post" action="processFuze.php">

                <!-- APPLICANT DETAILS -->
                <div id="applicantDetails" >
                    <div class="applicationProgress"> <span class="appheader">Personal Details </span>| Product Details | Confirmation </div>
                    <h4>Customer Details</h4>
                    <div class="error" id="divValidationStatus"> </div>
                    <table width="90%" border="0" cellpadding="0" cellspacing="0" class="form-table">
                        <tr>
                            <th width="20%"><label>First Name *</label></th>
                            <td><input type="text" id="txtApplicantFirstName" name="txtApplicantFirstName" size="20" /></td>
                            <td><span class="error" id="firstnameError"></span></td>
                        </tr>
                        <tr>
                            <th><label>Surname *</label></th>
                            <td><input type="text" id="txtApplicantSurname" name="txtApplicantSurname" size="20" /></td>
                            <td><span class="error" id="surnameError"></span></td>
                        </tr>
                        <tr>
                            <th><label>Home Phone&nbsp;&nbsp;</label></th>
                            <td><input type="text" id="txtApplicantHomePhone" name="txtApplicantHomePhone" size="20" /></td>
                            <td><span class="error" id="phoneError"></span></td>
                        </tr>
                        <tr>
                            <th><label>Mobile Phone *</label></th>
                            <td><input type="text" id="txtApplicantMobilePhone" name="txtApplicantMobilePhone" size="20" /></td>
                            <td><span class="error" id="mobileError"></span></td>
                        </tr>
                        <tr>
                            <th><label>Email Address *</label></th>
                            <td><input type="text" id="txtApplicantEmail" name="txtApplicantEmail" size="40" /></td>
                            <td><span class="error" id="emailError"></span></td>
                        </tr>
                    </table>
                    <h4>Service Address Details</h4>



                    <div id="sqAddress">                        
                        <?php
                        printAddress();
                        ?>
                    </div>


                    <h4>Service Details</h4>
                    <table width = "90%" border = "0" cellpadding = "0" cellspacing = "0" class = "form-table" id = "serviceDetailsTable">
                        <tr>
                            <th width = "20%"><label>Product Type *</label></th>
                            <td><select name = "ddlNetType" id = "ddlNetType">

                                </select></td>
                            <td><span class = "error" id = "netTypeError"></span></td>
                        </tr>
                        <tr>
                            <th><label>Services Required *</label></th>
                            <td><select name = "ddlservReq" id = "ddlservReq">
                                </select></td>
                            <td><span class = "error" id = "servError"></span></td>
                        </tr>
                    </table>

                    <p>* Indicates mandatory fields</p>
                    <p>
                        <button type = "button" id = "showPage1" onClick = "showNext1();">Next</button>
                    </p>
                </div>

                <!--SERVICE DETAILS-->

                <div id = "serviceDetails">
                    <div class = "applicationProgress"> Personal Details | <span class = "appheader">Product Details</span> | Confirmation </div>

                    <!--Username Selection-->
                    <div id = "userNameDiv">
                        <h4>FUZEconnect Username</h4><input type = "hidden" value = "" name = "vtiger" id = "vtiger" />
                        <table width = "90%" border = "0" cellpadding = "0" cellspacing = "0" class = "form-table">
                            <tr>
                                <th width = "30%"><label>Desired Username&nbsp;
                                        *</label></th>
                                <td><input type = "text" id = "txtUsername" name = "txtUsername">@fuzeconnect.net.au
                                    <span class = "error" id = "usernameError"></span>
                                    <input type = "button" onClick = "checkUsername();" value = "check availability" >
                                    <input type = "hidden" name = "usernameAvailable" id = "usernameAvailable" value = "nothing">

                                </td>
                            </tr>
                        </table>
                    </div>

                    <!--Internet Plan-->
                    <div id = "InternetSec">
                        <h4>Internet Services</h4>
                        <table width = "90%" border = "0" cellpadding = "0" cellspacing = "0" class = "form-table">
                            <tr>
                                <th width = "30%"><label>Internet Plan *</label></th>
                                <td><select name = "ddlPlanoption" id = "ddlPlanoption">

                                    </select>
                                    <span class = "error" id = "IplanError"></span></td>
                            </tr>
                            <tr>
                                <th width = "30%"><label>Port Speeds</label></th>
                                <td><span id = "portSpeedSpan">

                                    </span>
                                    <span class = "error" id = "portSpeedError"></span></td>
                            </tr>
                        </table>
                    </div>

                    <!----Internet Accessory selection----->
                    <div id = "accessories">
                        <table width = "90%" border = "0" cellpadding = "0" cellspacing = "0" class = "form-table">
                            <tr>
                                <th width = "30%"><label>Do you want a modem or Router from us?</label></th>
                                <td><select name = "ddlrouter" id = "ddlrouter">
                                        <option value = "0">Select....</option>
                                        <option value = "1">No</option>
                                        <option value = "2">Yes</option>
                                    </select>
                                    <span class = "error" id = "routerErr"></span></td>
                            </tr>
                        </table>
                        <span id = "internetNote"></span>
                        <p> NB: The Service connection fee does not include the cost of a modem. The type of modem provided will vary based on your location and the services you are applying for. <br/>
                            A Postage and handling fee of $19.95 will be applied to your account. If you require more details please call 1300 881 917.</p>
                    </div>

                    <!--Phone Plan-->

                    <div id = "VoipSec">
                        <h4>Phone Services</h4>
                        <table width = "90%" border = "0" cellpadding = "0" cellspacing = "0" class = "form-table">
                            <tr>
                                <th width = "30%"><label>Phone Plan *</label></th>
                                <td><select name = "ddlVoipPlan" id = "ddlVoipPlan">
                                    </select>
                                    <span class = "error" id = "VplanError"></span>
                                </td>
                            </tr>
                        </table>
                        <p>Do you want to port your existing number to FUZEconnect?&nbsp;
                            <input type = 'radio' name = 'radNumPort' id = 'yesPort' value = '1'/>Yes, please&nbsp;
                            <input type = 'radio' name = 'radNumPort' id = 'noPort' value = '2' checked = "checked"/>No, thanks&nbsp;
                        </p>
                        <div id = 'numToBePorted'>
                            <table width = "90%" border = "0" cellpadding = "0" cellspacing = "0" class = "form-table">
                                <tr>
                                    <th width = '30%'><label>Phone Number</label></th>
                                    <td>
                                        <input type = 'text' name = 'txtNumToPort' id = 'txtNumToPort'/>
                                        <span class = "error" id = "NumPortError"></span>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>

                    <!--Service Contract Option--->
                    <div id = "contractSec">
                        <h4>Service Contract Option</h4>
                        <table width = "90%" border = "0" cellpadding = "0" cellspacing = "0" class = "form-table">
                            <tr>
                                <th width = "30%"><label>Contract Option *</label></th>
                                <td><select name = "ddlContract" id = "ddlContract">

                                    </select>
                                    <span class = "error" id = "IcontractError"></span>
                                </td>
                            </tr>
                            <tr>
                                <th width = "30%"><label>Promo Code</label></th>
                                <td><input type = "text" id = "txtPromoCode" name = "txtPromoCode"/></td>
                            <span class = "error" id = "promoCodeError"></span>
                            </tr>
                        </table>
                    </div>

                    <div id = "TandC">
                        <p>I confirm I am over 18 years of age and I agree with the terms and conditions
                            set out by FUZEconect.
                            Click <a href = "Javascript: window.open('http://fuzeconnect.com.au/support/legal/');">here</a> to read the full terms and conditions</p>

                        <input type = 'radio' name = 'radTnC' class = 'TnC' id = 'iAgree' value = '1'/> I agree to the terms&nbsp;
                        <input type = 'radio' name = 'radTnC' class = 'TnC' id = 'notAgree' value = '2' checked = "checked"/> I do NOT agree
                        <br/><br/>
                        <span class = 'error' id = 'TnCError'></span>
                    </div>

                    <div id = "theError">
                        <p id = "InvalidSelectionError">I'm sorry seems you've selected a wrong option. Please go back and review your selections</p>
                        <br/><br/><p>Please call 1300 881 917 if you need help filling in the application</p>
                    </div>
                    <br/><br/>
                    <button type = "button" onClick = "showPrevious1();">Previous</button>
                    <button type = "button" id = "showPage2" onClick = "showNext2();">Next</button>
                </div>

                <!--END OF SERVICE SELECTION SECTION-->
                <!--APPLICATION CONFIRMATION SECTION-->

                <div id = "confirmDetails">
                    <div class = "applicationProgress"> Personal Details | Product Details | <span class = "appheader"> Confirmation</span> </div>
                    <div id = "confPersonal"></div>

                    <div id = "confService"></div>
                    <br /><br/>
                    <button type = "button" onClick = "showPrevious2();">Previous</button>
                    <span id = "btnSubmitSpan">
                        <input id = "submitnew" type = "submit"/>
                    </span>
                </div>
            </form>
        </div>
        <script type = "text/javascript">

            $('#frmInternetApplication').submit(function() {
                $('#btnSubmitSpan').html("<img src='loading.gif' alt='Loading..'/>");
                return;
            });

        </script>
    </body>
</html>
