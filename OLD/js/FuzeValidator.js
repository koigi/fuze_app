/*************************************************************
 * File Name:       Fuzevalidator.js                        **
 * Author:          Robert K                                **
 * Date:            12/13/2014                              **
 * Version:         1.1                                     **
 * Requirements:    JQuery 1.8+ FuzeHelper.js               **
 * Description:     This file contains javascript used      **
 *                  to validate the FUZEconnec online       **
 *                  internet application.                   **
 ************************************************************/

/*validates the first page of the application
 * @returns (boolean)
 */

function validateSection1() {

    var isValid = true;

    var DataSec1 = captureSection1Data();

    var firstNameError = $("#firstnameError");
    var surNameError = $("#surnameError");
    var phoneError = $("#phoneError");
    var mobileError = $("#mobileError");
    var emailError = $("#emailError");
    var streetNumberError = $("#streetNumberError");
    var streetNameError = $("#streetNameError");
    var surburbError = $("#surburbError");
    var stateError = $("#stateError");
    var postcodeError = $("#postCodeError");
    var netTypeError = $("#netTypeError");
    var servTypeError = $("#servError");



    if (DataSec1.FIRST_NAME == null || DataSec1.FIRST_NAME == "")
    {
        firstNameError.html("Please enter your first name");
        isValid = false;
    } else
        firstNameError.html("");

    if (DataSec1.LAST_NAME == null || DataSec1.LAST_NAME == "") {
        surNameError.html("Please enter your surname");
        isValid = false;
    } else
        surNameError.html("");


//Validate if a home number is valid and displays an error message if applicable    
    function nested_validateHomeNumber() {
        if (!(isPhoneNumValid(DataSec1.HOME_PHONE))) {
            phoneError.html("Please enter a valid number");
            isValid = false;
        }
        else if (isMobileNumberValid(DataSec1.HOME_PHONE)) {
            phoneError.html("Please enter a Landline Number");
            isValid = false;
        }
        else
            phoneError.html("");
    }
// validate if a mobile number and display an error message if applicable
    function nested_validateMobile() {
        if (!(isMobileNumberValid(DataSec1.MOBILE_PHONE))) {
            mobileError.html("Please enter a valid mobile number");
            isValid = false;
        } else
            mobileError.html("");
    }


    if ((DataSec1.MOBILE_PHONE == null || DataSec1.MOBILE_PHONE == "") &&
            (DataSec1.HOME_PHONE == null || DataSec1.HOME_PHONE == ""))
    {
        mobileError.html("");

        phoneError.html("Please enter at least one contact number");
        isValid = false;
    }
    else if (DataSec1.MOBILE_PHONE == null || DataSec1.MOBILE_PHONE == "") {
        mobileError.html("");
        nested_validateHomeNumber();
    }
    else if (DataSec1.HOME_PHONE == null || DataSec1.HOME_PHONE == "") {
        nested_validateMobile();
        phoneError.html("");
    }

    if (!(isEmailValid(DataSec1.EMAIL))) {
        emailError.html("Please enter a valid email address");
        isValid = false;
    } else
        emailError.html("");


    if (!(isAddressRangeValid(DataSec1.STREET_NUM))) {
        streetNumberError.html("Please enter a valid street number");
        isValid = false;
    } else
        streetNumberError.html("");

    if (DataSec1.STREET_NAME = null || DataSec1.STREET_NAME == "" || DataSec1.STREET_NAME.length < 4) {
        streetNameError.html("Please enter a valid street name");
        isValid = false;
    } else
        streetNameError.html("");


    if (DataSec1.SUBURB == null || DataSec1.SUBURB == "" || DataSec1.SUBURB.length < 2) {
        surburbError.html("Please enter your Suburb");
        isValid = false;
    } else
        surburbError.html("");


    if (DataSec1.POSTCODE == null || isNaN(DataSec1.POSTCODE) || DataSec1.POSTCODE == "" || DataSec1.POSTCODE.length != 4) {
        postcodeError.html("Please enter a valid Postcode");
        isValid = false;
    } else
        postcodeError.html("");


    if (DataSec1.STATE == "" || DataSec1.STATE < 2) {
        stateError.html("Please select what state you're from");
        isValid = false;
    } else
        stateError.html("");


    if (DataSec1.NET_TYPE == null || DataSec1.NET_TYPE == "" || DataSec1.NET_TYPE < 2 || DataSec1.NET_TYPE > 7) {
        netTypeError.html("Please select your network type");
        isValid = false;
    } else
        netTypeError.html("");


    if (DataSec1.SERVICE_REQ == null || DataSec1.SERVICE_REQ == ""
            || DataSec1.SERVICE_REQ < 2 || DataSec1.SERVICE_REQ > 6)
    {
        servTypeError.html("Please select the range of services you're applying for");
        isValid = false;
    } else
        servTypeError.html("");

    return isValid;
}


/*validates the second section of the application
 * @returns (boolean)
 */
function validateSection2() {

    var isValid = true;

    var errorUser = $("#usernameError");
    var errorPlan = $("#IplanError");
    var errorPort = $("#portSpeedError");
    var errorVoip = $("#VplanError");
    var errorContract = $("#IcontractError");
    var errorRouter = $("#routerErr");
    var errorPromo = $("#promoCodeError");
    var errorTnC = $("#TnCError");

    if ($('#userNameDiv').is(':visible')) {
        
        var strUserName = $.trim($("#txtUsername").val());
        var unameRegex = /@/gi;
        var usrAvail = $('#usernameAvailable').val();
        
        if(strUserName == "" || strUserName == null){
            errorUser.html("Please enter a username");
            isValid = false;
        }
        else if (usrAvail == 'no')
        {
            errorUser.html("Username already exists");
            isValid = false;
        }
        else if (unameRegex.test(strUserName))
        {
            errorUser.html("A username cannot be a valid email address");
            isValid = false;
        }
        else if(usrAvail == "nothing"){
            errorUser.html("Please check if the username is available");
            isValid = false;
        }
        else
        {
            errorUser.html("");
        }
    }

    if ($('#InternetSec').is(':visible')) {
        var strPlan = $("#ddlPlanoption").val();
        var strPort = $("input[name=radPortSpeed]:radio");

        if (strPlan == Plan.NO_OPTION)
        {
            errorPlan.html("Please select an Internet Plan");
            isValid = false;
        } else
        {
            errorPlan.html("");
        }
        
        if(!strPort.is(':checked')){
            errorPort.html("Please choose a port speed");
            isValid = false;
        }
        else
        {
            errorPort.html("");
        }
        
    }

    if ($('#VoipSec').is(':visible')) {
        var strVplan = $("#ddlVoipPlan").val();

        var numPort = document.getElementById("yesPort").checked;

        if (numPort) {
            var strPhoneNum = $.trim($("#txtNumToPort").val());
            var errorPortNum = $("#NumPortError");

            if (!(isPhoneNumValid(strPhoneNum)) || strPhoneNum == "" || strPhoneNum == null) {
                errorPortNum.html("Please enter a valid number");
                isValid = false;
            } else {
                errorPortNum.html("");
            }
        }

        if (strVplan == Plan.NO_OPTION)
        {
            errorVoip.html("Please select a Phone plan option");
            isValid = false;
        } else
        {
            errorVoip.html("");
        }
    }

    if ($('#contractSec').is(':visible')) {
        var strContract = $("#ddlContract").val();
        var strPromoCode = $.trim($("txtPromoCode").val());

        if (strContract == Contract.NO_OPTION)
        {
            errorContract.html("Please select a contract option");
            isValid = false;
        } else
        {
            errorContract.html("");
        }
        if (strPromoCode.legth > 12){
            errorPromo.html("Invalid Promocode");
            isValid = false;
        }
        else{
            errorPromo.html("");
        }
    }

    if ($('#accessories').is(':visible')) {
        var strRouter = $("#ddlrouter").val();

        if (strRouter == Router.NO_OPTION)
        {
            errorRouter.html("Please select an option");
            isValid = false;
        } else
        {
            errorRouter.html("");
        }
    }

    var TnC = document.getElementById("iAgree").checked;
    if (TnC === false) {
        isValid = false;
        errorTnC.html("To continue with the application you need to agree to FUZEconnect's Terms and Conditions");
    }
    else {
        errorTnC.html("");
    }

    return isValid;
}