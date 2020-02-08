/*****************************************************************
 * File Name:       Fuzevalidator.js                            **
 * Author:          Robert K & Hanumantha M                     **
 * Date:            10/01/2014                                  **
 * Version:         1.1                                         **
 * Requirements:    JQuery 1.8+ FuzeHelper.js                   **
 * Description:     This file contains javascript used          **
 *                  to perform the various ajax requests        **
 *                  for the FUZEconnect internet application.   **
 ****************************************************************/

/*checkUsername will query CRM if a username is used already used or not
 * 
 */

function checkUsername() {

    var usernameRaw = $("#txtUsername").val();
    var invalidUsernameRegex = /(@|\&|\%|\#|\^|\!|\~|\"|\'|\:|\;|\*|\(|\)|\+|\=)/gi;

    var username = usernameRaw.replace(/\s/g, '');
    var uNameError = $("#usernameError");

    if (5 > username.length) {
        uNameError.html("<span id='uNameNotAvailable'>Please enter a username that's at least 5 characters</span>");
        $("#usernameAvailable").val("no");
    }
    else if(invalidUsernameRegex.test(username)){
        var invalidCharachter = username.match(invalidUsernameRegex);
        uNameError.html("<span id='uNameNotAvailable'>Invalid Charachter '"+invalidCharachter+"' in Username</span>");
        $("#usernameAvailable").val("no");
    }
    else {
        var uNameData = $.ajax({
            type: "GET",
            url: "checkusername.php",
            async: true,
            data: {"username": username},
            beforeSend: function(resp) {
                uNameError.html("<img src='loading.gif' alt='Checking...'/>");
            },
            success: function(resp) {
                if (resp == 0) {
                    uNameError.html("<span id='uNameAvailable'>Username is available</span>");
                    $("#usernameAvailable").val("yes");
                }
                else if (resp == 1) {
                    uNameError.html("<span id='uNameNotAvailable'>Username is Not available</span>");
                    $("#usernameAvailable").val("no");
                }
                else
                    uNameError.html("<span class='error'>Invalid username, Please try again</span>");
            }
        });
    }
}

$(function() {
    $("#showPage1").click(function() {
        if (validateSection1()) {
           
            var section1Data = captureSection1Data();

            var dataString = 'page1=yes&fname=' + section1Data.FIRST_NAME +
                    '&lname=' + section1Data.LAST_NAME +
                    '&phone=' + section1Data.HOME_PHONE +
                    '&mob=' + section1Data.MOBILE_PHONE +
                    '&email=' + section1Data.EMAIL +
                    '&unitNum=' + section1Data.UNIT_NUM +
                    '&streetNum=' + section1Data.STREET_NUM +
                    '&streetN=' + section1Data.STREET_NAME +
                    '&city=' + section1Data.SUBURB +
                    '&state=' + section1Data.STATE +
                    '&pcode=' + section1Data.POSTCODE +
                    '&netType' + section1Data.NET_TYPE +
                    '&servReq' + section1Data.SERVICE_REQ;

            var subData = $.ajax({
                type: "POST",
                async: true,
                url: "processAjax.php",
                data: dataString,
                success: function() {
                    var res = subData.responseText;

                    $("#vtiger").val(res);
                    return true;
                }
            });
        }
    });

    $("#showPage2").click(function() {
        if (validateSection2()) {
            var vid = $("input#vtiger").val();
            var unameRaw = $("input#txtUsername").val();
            var uname = unameRaw.replace(/\s/g, "");
            var intPlan = $("select#ddlPlanoption").val();
            var portSpeed = $("input[name=radPortSpeed]:checked").val();
            var router = $("select#ddlrouter").val();
            var phPlan = $("select#ddlVoipPlan").val();
            var numToPort = $("input#txtNumToPort").val();
            var ddlContract = $("select#ddlContract").val();

            var dataString = 'vid=' + vid +
                    '&uname=' + uname +
                    '&intPlan=' + intPlan +
                    '&portSpeed=' + portSpeed +
                    '&router=' + router +
                    '&phPlan=' + phPlan +
                    '&numPort=' + numToPort +
                    '&ddlContract=' + ddlContract;


            var subData = $.ajax({
                type: "POST",
                async: true,
                url: "processAjax.php",
                data: dataString,
                success: function() {
                    var res = subData.responseText;
                    $("#vtiger").val(res);

                    return true;
                }
            });
        }
    });
});

function getAddressParts(){
    
}
