/***********************************************************************
 * File Name:       FUZEnet.js
 * Author:          Robert K
 * Date:            19/03/2014
 * Version:         1.3
 * Prerequisites:   FuzeHelper.js, FuzeValidator.js, JQuery 1.8+
 * Description:     FUZEnet.js will control all the javascript 
 *                  functionality of the FUZEnet online
 *                  internet application
 * *********************************************************************/

//ENTRY POINT OF THE APPLICATION
$(document).ready(function() {
    //show First page and hide the rest of the application
    showSection("#applicantDetails");

    //when the feilds below change run a mock SQ for Alcove apartments and display list networks 
    $("#txtStreetNumber, #txtStreetName, #txtPostCode, #txtSurburb").keyup(function() {
        
        if (true == mockSq() || true == isVS3Application()){
            showNetworks(true);
        }
        else{
            showNetworks(false);
        }
        
    }).change();
    
    //to acomodate the SQ we need to update this
    $("#frmInternetApplication").hover(function(){
        if(3 < $("#txtStreetName").val().length){
        if (true == mockSq() || true == isVS3Application()){
            showNetworks(true);
        }
        else{
            showNetworks(false);
        }
    }
    });
    

    $("#ddlNetType, #ddlState").change(function() {
        //show list of available services depending on what services are selected
        showServices();
    }).change();
});

/*showPlan shows the plans & contract options availables based on
 * the previous pages content
 * @param {void};
 * @returns {void}
 */
function showPlan() {
    
    resetPlan();

    var strNetType = $("#ddlNetType").val();
    var strServType = $("#ddlservReq").val();
    var isVS3App = isVS3Application();

    var inet_plan_options = {};
    var inet_contract_options = {};
    var voip_plan_options = {};
    var port_speed = {};
    
    //Cable Service Applications
    if (strNetType == Net.CABLE) {
        inet_plan_options = {
            "Select...": Plan.NO_OPTION,
            "FUZEnet 100GB ": Plan.HFC_100,
            "Unlimited Cable Broadband ": Plan.UNLTD_CABLE
        };
        voip_plan_options = {
            "Select...": Plan.NO_OPTION,
            "FuzeTalk Access ": Plan.FT_ACCESS,
            "FuzeTalk Max ": Plan.FT_MAX,
            "FuzeTalk Unlimited ": Plan.FT_UNLIMITED,
        };
        inet_contract_options = {
            "Select...": Contract.NO_OPTION,
            "FREE SETUP - Limited Time Only": Contract.FREE_SETUP,
        };

        port_speed = {
            "Up to 8Mbps ": Port.MBPS_8
        };
//Prices have been removed
        

        if (strServType == Service.BOTH) {
            $('#theError').hide();
            $("#VoipSec").show();
            $("#userNameDiv").show();
            $('#InternetSec').show();
            $('#accessories').show();
            $("#contractSec").show();
        }
        else if (strServType == Service.INET) {
            $('#theError').hide();
            $("#VoipSec").hide();
            $("#userNameDiv").show();
            $('#InternetSec').show();
            $('#accessories').show();
            $("#contractSec").show();
        }
        $("#internetNote").empty();
        var finePrint = "<br /> * <strong>FREE SETUP:</strong> for a limited amount of time we'll cover the set up fee for a risk free trial.(Wireless router Not Included)";
        $("#internetNote").append(finePrint);
    }
    
    //Fibre Service Applications
    else if (strNetType == Net.FIBRE) {
        inet_plan_options = {
            "Select...": Plan.NO_OPTION,
            "FUZEnet 100GB ": Plan.FN_25M_100GB,
            "FUZEnet 200GB ": Plan.FN_25M_200GB,
            "FUZEnet 300GB ": Plan.FN_25M_300GB,
            "FUZEnet 500GB ": Plan.FN_25M_500GB,
            "FUZEnet 1000GB ": Plan.FN_25M_1000GB,
        };
        voip_plan_options = {
            "Select...": Plan.NO_OPTION,
            "FuzeTalk Access ": Plan.FT_ACCESS,
            "FuzeTalk Max ": Plan.FT_MAX,
            "FuzeTalk Unlimited ": Plan.FT_UNLIMITED,
        };
        inet_contract_options = {
            "Select...": Contract.NO_OPTION,
            "24 Month Contract ": Contract.FIBRE_24,
            "12 Month Contract ": Contract.FIBRE_12,
            "6 Month Contract ": Contract.FIBRE_6,
            "No Contract ": Contract.FIBRE_NC
        };
        port_speed = {
            "Up to 25Mbps ": Port.MBPS_25,
            "Up to 50Mbps ": Port.MBPS_50,
            "Up to 100Mbps ": Port.MBPS_100
        };

        if (strServType == Service.BOTH) {
            $('#theError').hide();
            $("#VoipSec").show();
            $("#userNameDiv").show();
            $('#InternetSec').show();
            $('#accessories').show();
            $("#contractSec").show();
        }
        else if (strServType == Service.INET) {
            $('#theError').hide();
            $("#VoipSec").hide();
            $("#userNameDiv").show();
            $('#InternetSec').show();
            $('#accessories').show();
            $("#contractSec").show();
        }
        else if (strServType == Service.PHONE) {
            $('#theError').hide();
            $("#VoipSec").show();
            $("#userNameDiv").show();
            $('#InternetSec').hide();
            $('#accessories').hide();
            $("#contractSec").show();
        }
        else {
            $("#VoipSec").hide();
            $("#userNameDiv").hide();
            $("#InternetSec").hide();
            $("#accessories").hide();
            $("#theError").show();
            $("#contractSec").hide();
        }
    }

    //VDSL Service Application
    else if (strNetType == Net.VDSL) {

        if (mockSq() == true)
        {
            inet_plan_options = {
                "Select...": Plan.NO_OPTION,
                "Unlimited ADSL2+ & FuzeTalk Unlimited *": Plan.ON_DSL_UNLTD_BDL, //79.95 
                "FUZEnet 100GB ": Plan.FN_25M_100GB,
                "FUZEnet 200GB ": Plan.FN_25M_200GB,
                "FUZEnet 300GB ": Plan.FN_25M_300GB,
                "FUZEnet 500GB ": Plan.FN_25M_500GB,
                "FUZEnet 1000GB ": Plan.FN_25M_1000GB,
            };
            $("#internetNote").empty();
            var finePrint = "<br /> * The Unlimited ADSL2+ comes with a free FuzeTalk Unlimited Phone plan for $79.95 per month";
            $("#internetNote").append(finePrint);

        } else {

            inet_plan_options = {
                "Select...": Plan.NO_OPTION,
                "FUZEnet 100GB ": Plan.FN_25M_100GB,
                "FUZEnet 200GB ": Plan.FN_25M_200GB,
                "FUZEnet 300GB ": Plan.FN_25M_300GB,
                "FUZEnet 500GB ": Plan.FN_25M_500GB,
                "FUZEnet 1000GB ": Plan.FN_25M_1000GB,

            };
        }

        voip_plan_options = {
            "Select...": Plan.NO_OPTION,
            "FuzeTalk Access ": Plan.FT_ACCESS,
            "FuzeTalk Max ": Plan.FT_MAX,
            "FuzeTalk Unlimited ": Plan.FT_UNLIMITED
        };
        
        
        if(isVS3App){
            inet_contract_options = {
                "Select...": Contract.NO_OPTION,
                "No Contract, Free Setup ": Contract.ADSL_NC
            };
        }
        else{
            inet_contract_options = {
                "Select...": Contract.NO_OPTION,
                "24 Month Contract ": Contract.VDSL_24,
                "12 Month Contract ": Contract.VDSL_12,
                "6 Month Contract ": Contract.VDSL_6,
                "No Contract ": Contract.VDSL_NC
            };
        }
        
        port_speed = {
            "Up to 25Mbps ": Port.MBPS_25,
            "Up to 50Mbps ": Port.MBPS_50,
            "Up to 100Mbps ": Port.MBPS_100
        };


        if (strServType == Service.BOTH) {
            $('#theError').hide();
            $("#VoipSec").show();
            $("#userNameDiv").show();
            $('#InternetSec').show();
            $('#accessories').show();
            $("#contractSec").show();
        }
        
        else if (strServType == Service.INET) {
            $('#theError').hide();
            $("#VoipSec").hide();
            $("#userNameDiv").show();
            $('#InternetSec').show();
            $('#accessories').show();
            $("#contractSec").show();
        }
        else if (strServType == Service.PHONE) {
            $('#theError').hide();
            $("#VoipSec").show();
            $("#userNameDiv").show();
            $('#InternetSec').hide();
            $('#accessories').hide();
            $("#contractSec").show();
        }
        else {
            $("#VoipSec").hide();
            $("#userNameDiv").hide();
            $("#InternetSec").hide();
            $("#accessories").hide();
            $("#theError").show();
            $("#contractSec").hide();
        }
    }

    //ADSL2+ Service Application
    else if (strNetType == Net.ADSL) {

        if (mockSq() == true)
        {
            inet_plan_options = {
                "Select...": Plan.NO_OPTION,
                "Unlimited ADSL2+ & FuzeTalk Unlimited *": Plan.ON_DSL_UNLTD_BDL,
                "LocalNet ADSL2+ 50GB ": Plan.LN_ADSL_50GB,
                "LocalNet ADSL2+ 200GB ": Plan.LN_ADSL_200GB,
                "LocalNet ADSL2+ 500GB ": Plan.LN_ADSL_500GB,
                "LocalNet ADSL2+ 1000GB ": Plan.LN_ADSL_1000GB
            };
            $("#internetNote").empty();
            var finePrint = "<br /> * The Unlimited ADSL2+ comes with a free FuzeTalk Unlimited  Phone plan for $79.95 per month";
            $("#internetNote").append(finePrint);

        } else {
            inet_plan_options = {
                "Select...": Plan.NO_OPTION,
                "LocalNet ADSL2+ 50GB ": Plan.LN_ADSL_50GB,
                "LocalNet ADSL2+ 200GB ": Plan.LN_ADSL_200GB,
                "LocalNet ADSL2+ 500GB ": Plan.LN_ADSL_500GB,
                "LocalNet ADSL2+ 1000GB ": Plan.LN_ADSL_1000GB
            };
        }
        inet_contract_options = {
            "Select...": Contract.NO_OPTION,
            "24 Month Contract ": Contract.ADSL_24,
            "12 Month Contract ": Contract.ADSL_12,
            "6 Month Contract ": Contract.ADSL_6,
            "No Contract ": Contract.ADSL_NC,
            "Existing Customer Transfer ": Contract.ADSL_XFER
        };
        port_speed = {            
            "ADSL2+ Speeds ": Port.ADSL
        };

        if (strServType == Service.INET || strServType == Service.BOTH) {
            $('#theError').hide();
            $("#VoipSec").hide();
            $("#userNameDiv").show();
            $('#InternetSec').show();
            $('#accessories').show();
            $("#contractSec").show();
        }
        else {
            $("#VoipSec").hide();
            $("#userNameDiv").hide();
            $("#InternetSec").hide();
            $("#accessories").hide();
            $("#theError").show();
            $("#contractSec").show();
        }
    }

    //Naked ADSL2+ Service Application
    else if (strNetType == Net.NAKEDADSL) {
        
        if (mockSq() == true)
        {
            inet_plan_options = {
                "Select...": Plan.NO_OPTION,
                "Unlimited ADSL2+ & FuzeTalk Asia *": Plan.ON_DSL_UNLTD_BDL,
                "Naked ADSL2+ 50GB ": Plan.NADSL_50GB,
                "Naked ADSL2+ 200GB ": Plan.NADSL_200GB,
                "Naked ADSL2+ 500GB ": Plan.NADSL_500GB,
                "Naked ADSL2+ 1000GB ": Plan.NADSL_1000GB
            };
            $("#internetNote").empty();
            var finePrint = "<br /> * The Unlimited ADSL2+ comes with a free FuzeTalk Asia Phone plan for $79.95 per month";
            $("#internetNote").append(finePrint);

        } else {
            inet_plan_options = {
                "Select...": Plan.NO_OPTION,
                "Naked ADSL2+ 50GB ": Plan.NADSL_50GB,
                "Naked ADSL2+ 200GB ": Plan.NADSL_200GB,
                "Naked ADSL2+ 500GB ": Plan.NADSL_500GB,
                "Naked ADSL2+ 1000GB ": Plan.NADSL_1000GB
            };
        }

        inet_contract_options = {
            "Select...": Contract.NO_OPTION,
            "24 Month Contract ": Contract.ADSL_24,
            "12 Month Contract ": Contract.ADSL_12,
            "6 Month Contract ": Contract.ADSL_6,
            "No Contract ": Contract.ADSL_NC,
            "Existing Customer Transfer ": Contract.ADSL_XFER
        };
        port_speed = {            
            "ADSL2+ Speeds ": Port.ADSL
        };

        if (strServType == Service.INET || strServType == Service.BOTH) {
            $('#theError').hide();
            $('#VoipSec').hide();
            $("#userNameDiv").show();
            $('#InternetSec').show();
            $('#accessories').show();
            $("#contractSec").show();
        }
        else {
            $("#VoipSec").hide();
            $("#userNameDiv").hide();
            $("#InternetSec").hide();
            $("#accessories").hide();
            $("#theError").show();
            $("#contractSec").hide();
        }
    }

    //On Net ADSL2+ Applications
    else if (strNetType == Net.ON_DSL) {

        if (strServType == Service.BOTH) {
            inet_plan_options = {
                "Select...": Plan.NO_OPTION,
                "OnNet ADSL2+ 100GB ": Plan.ON_DSL_100GB, //49.95
                "OnNet Unlimited ADSL2+ ": Plan.ON_DSL_UNLTD, //$69.95
                "OnNet Unlimited ADS2+ & Phone Bundle ": Plan.ON_DSL_UNLTD_BDL //$79.95
            };
        }
        else{
            inet_plan_options = {
                "Select...": Plan.NO_OPTION,
                "OnNet ADSL2+ 100GB ": Plan.ON_DSL_100GB, //49.95
                "OnNet Unlimited ADSL2+ ": Plan.ON_DSL_UNLTD, //$69.95
            };
        }
        
        if(isVS3App){
            inet_contract_options = {
                "Select...": Contract.NO_OPTION,
                "No Contract, Free Setup ": Contract.ADSL_NC
            };
        }
        else{
            inet_contract_options = {
                "Select...": Contract.NO_OPTION,
                "24 Month Contract ": Contract.ADSL_24,
                "12 Month Contract ": Contract.ADSL_12,
                "6 Month Contract ": Contract.ADSL_6,
                "No Contract ": Contract.ADSL_NC
            };
        }
        
        
        port_speed = {            
            "ADSL2+ Speeds ": Port.ADSL
        };

        if (strServType == Service.INET || strServType == Service.BOTH) {
            $('#theError').hide();
            $("#VoipSec").hide();
            $("#userNameDiv").show();
            $('#InternetSec').show();
            $('#accessories').show();
            $("#contractSec").show();
        }
        else {
            $("#VoipSec").hide();
            $("#userNameDiv").hide();
            $("#InternetSec").hide();
            $("#accessories").hide();
            $("#theError").show();
            $("#contractSec").show();
        }
    }

    else {
        $("#VoipSec").hide();
        $("#InternetSec").hide();
        $("#accessories").hide();
        $("#userNameDiv").hide();
        $("#contractSec").hide();
        $("#theError").show();
    }

    if (!$('#theError').is(':visible')) {
        if ($('#InternetSec').is(':visible')) {
            var select = $("#ddlPlanoption");
            select.html('');
            var optionOut = '';
            for (var key in inet_plan_options) {
                optionOut = '<option value ="' + inet_plan_options[key];
                optionOut += '">' + key + '</option>';
                select.append(optionOut);
            }
            
            var portSpan = $("#portSpeedSpan");
            var htmlOut = "";
            portSpan.html("");
            
            for (var key in port_speed){
                htmlOut = "<input type='radio' name='radPortSpeed' value='"+port_speed[key];
                htmlOut += "'>"+key+'<br/>';
                portSpan.append(htmlOut);
            }
        }

        if ($('#contractSec').is(':visible')) {
            var select = $("#ddlContract");
            select.html('');
            for (var key in inet_contract_options) {
                option = $('<option/>');
                option.attr({'value': inet_contract_options[key]});
                option.text(key);
                select.append(option);
            }
        }

        if ($('#VoipSec').is(':visible')) {
            var select = $("#ddlVoipPlan");
            select.html('');
            for (var key in voip_plan_options) {
                option = $('<option/>');
                option.attr({'value': voip_plan_options[key]});
                option.text(key);
                select.append(option);
            }
            $("#numToBePorted").hide();

            //If the number port selection changes hide or show the phone number input box
            $("#noPort, #yesPort").change(function() {
                var numPort = document.getElementById("yesPort").checked;

                if (numPort == true) {
                    $("#numToBePorted").show();
                } else {
                    var errorPortNum = document.getElementById("NumPortError");
                    errorPortNum.innerHTML = "";
                    $("#numToBePorted").hide();
                }
            });
        }
    }
}
