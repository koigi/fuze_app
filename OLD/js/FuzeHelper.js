/****************************************************************
 * **************************************************************
 ** File Name:      FuzeHelper.js                              **
 ** Author:         Robert K                                   **
 ** Date:           12/03/2014                                 **
 ** Version:        1.2                                        **
 ** Requirements:   JQuery1.8+                                 **
 ** Description:    FuzeHelper contains some of                **
 **                 functions and variables used to make       **
 **                 the FUZEconnect online application work.   **
 ****************************************************************
 ***************************************************************/

//List of services available 
var Service = {
    NO_OPT: 1,
    BOTH: 2,
    INET: 3,
    PHONE: 4,
    TV: 5
};

//Network Options Available 
var Net = {
    NO_OPT: 0,
    FIBRE: 2,
    CABLE: 3,
    VDSL: 4,
    ADSL: 5,
    NAKEDADSL: 6,
    ON_DSL: 7
};

//Plan selections available
var Plan = {
    //OnNet Plans
    FN_25M_100GB: 1,
    FN_25M_200GB: 2,
    FN_25M_300GB: 3,
    FN_25M_500GB: 4,
    FN_25M_1000GB: 5,
    FN_50M_100GB: 6,
    FN_50M_200GB: 7,
    FN_50M_300GB: 8,
    FN_50M_500GB: 9,
    FN_50M_1000GB: 10,
    FN_100M_100GB: 11,
    FN_100M_200GB: 12,
    FN_100M_300GB: 13,
    FN_100M_500GB: 14,
    FN_100M_1000GB: 15,
    //OnNet ADSL2+ Plans
    ON_DSL_100GB: 31,
    ON_DSL_UNLTD: 32,
    ON_DSL_UNLTD_BDL: 33,
    //OffNet Naked ADSL2+ Plans
    NADSL_50GB: 25,
    NADSL_100GB: 16,
    NADSL_200GB: 17,
    NADSL_500GB: 18,
    NADSL_1000GB: 19,
    //OffNet ADSL2+ Plans
    LN_ADSL_50GB: 26,
    LN_ADSL_100GB: 20,
    LN_ADSL_200GB: 21,
    LN_ADSL_500GB: 22,
    LN_ADSL_1000GB: 23,
    // Bundle Plan
    FN_UNLTD: 24,
    //Cable plans
    UNLTD_CABLE: 30,
    HFC_100: 35,
    //Phone plans
    FT_ACCESS: 501,
    FT_UNLIMITED: 502,
    FT_ASIA: 503,
    FT_MAX: 504,
    NO_OPTION: 0
};

//Accessory Selection
var Router = {
    NO_OPTION: 0,
    NO: 1,
    YES: 2
};

//Contract Selections
var Contract = {
    FIBRE_24: 601,
    FIBRE_12: 602,
    FIBRE_6: 603,
    FIBRE_NC: 604,
    VDSL_24: 605,
    VDSL_12: 606,
    VDSL_6: 607,
    VDSL_NC: 608,
    ADSL_24: 611,
    ADSL_12: 612,
    ADSL_6: 613,
    ADSL_NC: 614,
    ADSL_XFER: 615,
    NO_OPTION: 0,
    TV: 616,
    WA_FIBRE_24: 617,
    WA_FIBRE_12: 618,
    WA_FIBRE_06: 619,
    WA_FIBRE_NC: 620,
    FREE_SETUP: 621

};

//Port speed options
var Port = {
    NO_OPT: 0,
    MBPS_8: 8,        
    MBPS_25: 25,
    MBPS_50: 50, 
    MBPS_100:100,
    ADSL: "ADSL"
};

/*hideAll() hides the sections of the application. 
 * To be used when transitioning between sections in the application * 
 * @returns {void}
 */
function hideAll() {
    $("#applicantDetails").hide();
    $("#serviceDetails").hide();
    $("#confirmDetails").hide();
}

/*
 * will accept a section name and then show it
 * @param {string} sectionName
 * @returns {undefined}
 */
function showSection(sectionName){
    hideAll();
    $(sectionName).show();
}

/*will capture the data entered into section one of the application
 * This will make validation easier
 * @returns (object)
 */
function captureSection1Data() {
    var DataSec1 = {
        FIRST_NAME: null,
        LAST_NAME: null,
        HOME_PHONE: null,
        MOBILE_PHONE: null,
        EMAIL: null,
        UNIT_NUM: null,
        STREET_NUM: null,
        STREET_NAME: null,
        SUBURB: null,
        POSTCODE: null,
        STATE: null,
        NET_TYPE: null,
        SERVICE_REQ: null
    };

    DataSec1.FIRST_NAME = $.trim($("#txtApplicantFirstName").val());
    DataSec1.LAST_NAME = $.trim($("#txtApplicantSurname").val());
    DataSec1.HOME_PHONE = $.trim($("#txtApplicantHomePhone").val());
    DataSec1.MOBILE_PHONE = $.trim($("#txtApplicantMobilePhone").val());
    DataSec1.EMAIL = $.trim($("#txtApplicantEmail").val());
    DataSec1.UNIT_NUM = $.trim($("#txtUnitNumber").val());
    DataSec1.STREET_NUM = $.trim($("#txtStreetNumber").val());
    DataSec1.STREET_NAME = $.trim($("#txtStreetName").val());
    DataSec1.SUBURB = $.trim($("#txtSurburb").val());
    DataSec1.POSTCODE = $.trim($("#txtPostCode").val());

    DataSec1.STATE = $("#ddlState").val();
    DataSec1.NET_TYPE = $("#ddlNetType").val();
    DataSec1.SERVICE_REQ = $("#ddlservReq").val();
    
    return DataSec1;
}

/*
 * translate network type number to a network type string
 * @param {string} x
 * @returns {string}
 */
function checkNet(x) {
    switch (parseInt(x)) {
        case Net.FIBRE:
            return "Fibre/ Ethernet";
        case Net.CABLE:
            return "Cable";
        case Net.VDSL:
            return "VDSL";
        case Net.ADSL:
            return "ADSL2+";
        case Net.NAKEDADSL:
            return "Naked ADSL2+";
        case Net.ON_DSL:
            return "OnNet ADSL2+";
        default:
            return null;
    }
}

/*translates plan number into plan name
 * @param {string} x
 * @returns {string}
 */
function checkPlan(x) {
    switch (parseInt(x))
    {
        case Plan.NO_OPTION:
            return null;
            //OnNet plans    
        case Plan.FN_25M_100GB:
            return "25Mbps FuzeNet 100GB $49.95";
        case Plan.FN_25M_200GB:
            return "25Mbps FuzeNet 200GB $59.95";
        case Plan.FN_25M_300GB:
            return "25Mbps FuzeNet 300GB $69.95";
        case Plan.FN_25M_500GB:
            return "25Mbps FuzeNet 500GB $89.95";
        case Plan.FN_25M_1000GB:
            return "25Mbps FuzeNet 1000GB $99.95";
           
        case Plan.ON_DSL_100GB:
            return "OnNet ADSL2+ 100GB $49.95";
        case Plan.ON_DSL_UNLTD:
            return "OnNet Unlimited ADSL2+ $69.95";
        case Plan.ON_DSL_UNLTD_BDL:
            return "OnNet Unlimited ADSL2+ & Phone Bundle $79.95";
            // Naked ADSL2+ Plans
        case Plan.NADSL_50GB:
            return "Naked ADSL2+ 50GB $49.95";
        case Plan.NADSL_100GB:
            return "Naked ADSL2+ 100GB $59.95";
        case Plan.NADSL_200GB:
            return "Naked ADSL2+ 200GB $69.95";
        case Plan.NADSL_500GB:
            return "Naked ADSL2+ 500GB $89.95";
        case Plan.NADSL_1000GB:
            return "Naked ADSL2+ 1000GB $109.95";
            //ADSL2+ Plans
        case Plan.LN_ADSL_50GB:
            return "LocalNet ADSL2+ 50GB $39.95";
        case Plan.LN_ADSL_100GB:
            return "LocalNet ADSL2+ 100GB $49.95";
        case Plan.LN_ADSL_200GB:
            return "LocalNet ADSL2+ 200GB $59.95";
        case Plan.LN_ADSL_500GB:
            return "LocalNet ADSL2+ 500GB $79.95";
        case Plan.LN_ADSL_1000GB:
            return "LocalNet ADSL2+ 1000GB $99.95";
            //Bundle plan
        case Plan.FN_UNLTD:
            return "Unlimited ADSL2 + FuzeTalk Unlimited $79.95";
            //Phone Plans
        case Plan.FT_ACCESS:
            return "FuzeTalk Access $9.95";
        case Plan.FT_MAX:
            return "FuzeTalk Max $14.95";
        case Plan.FT_UNLIMITED:
            return "FuzeTalk Unlimited $19.95";
            //On Net Cable Plans
        case Plan.UNLTD_CABLE:
            return "HFC Unlimited Cable $69.95";
        case Plan.HFC_100:
            return "HFC 100 Cable $49.95";
        default:
            return null;
    }
}

/*translates contract number into plan name
 * @param {string} x
 * @returns {string}
 */
function checkContract(x) {
    switch (parseInt(x))
    {
        case Contract.NO_OPTION:
            return null;
        case Contract.FIBRE_24:
            return "24 Month Contract $0";
        case Contract.FIBRE_12:
            return "12 Month Contract $49";
        case Contract.FIBRE_6:
            return "6 Month Contract $99";
        case Contract.FIBRE_NC:
            return "No Contract $199";
        case Contract.WA_FIBRE_24:
            return "24 Month Contract $0";
        case Contract.WA_FIBRE_12:
            return "12 Month Contract $49";
        case Contract.WA_FIBRE_06:
            return "6 Month Contract $99";
        case Contract.WA_FIBRE_NC:
            return "No Contract $199";
        case Contract.VDSL_24:
            return "24 Month Contract $0";
        case Contract.VDSL_12:
            return "12 Month Contract $99";
        case Contract.VDSL_6:
            return "6 Month Contract $199";
        case Contract.VDSL_NC:
            return "No Contract $299";
        case Contract.WA_FIBRE_NC:
            return "No Contract $199";
        case Contract.ADSL_24:
            return "24 Month Contract $0";
        case Contract.ADSL_12:
            return "12 Month Contract $49";
        case Contract.ADSL_6:
            return "6 Month Contract $75";
        case Contract.ADSL_NC:
            return "No Contract $99";
        case Contract.ADSL_XFER:
            return "Existing customer transfer $49";
        case Contract.FREE_SETUP:
            return "FREE SETUP - Limited Time only";
        default:
            return null;
    }
}

/*translates a service selection number to a Service
 * @param {string} x
 * @returns {string}
 */
function checkApp(x) {
    switch (parseInt(x))
    {
        case Service.BOTH:
            return "All available Services";
        case Service.INET:
            return "Internet Only Application";
        case Service.PHONE:
            return "Phone Only Application";
        default:
            return "Invalid Application";
    }
}

/*
 * translates router selection number to either yes or no
 * @param {string} x
 * @returns {string}
 */
function checkRouter(x){
    switch(parseInt(x)){
        case Router.YES:
            return "Yes";
        case Router.NO:
            return "No";
        case Router.NO_OPTION:
            return "No Selection";
        default:
            return "Invalid Input";
    }
}

/*validates a string as a valid Australian landline number
 * NB: Special 1300, 1800, 13 will pass as valid numbers
 * @param {string} x
 * @returns {boolean}
 */
function isPhoneNumValid(x) {
    var aPhone = $.trim(x.replace(/ /g, ''));
    var phoneRegex = /(^1300\d{6}$)|(^1800|1900|1902\d{6}$)|(^0[2|3|7|8]{1}[0-9]{8}$)|(^13\d{4}$)/gi;
    return phoneRegex.test(aPhone);
}

/*validates a string as a valid Australian mobile number
 * NB: +614, 04, 614 prefixes will pass validation
 * @param {string} x
 * @returns {boolean}
 * //JUST MODIFIED THE REGEX NEED TO TEST THIS
 */
function isMobileNumberValid(x) {
    var aMobile = $.trim(x.replace(/ /g, ''));
    var mobileRegex = /(^(04|\+614|614)\d{2}\d{6}$)/gi;
    return mobileRegex.test(aMobile);
}

/* validates a string as a valid email adddress as per RFC822
 * @param {string} x
 * @returns {boolean}
 */
function isEmailValid(x) {
    var anEmail = $.trim(x.replace(/ /g, ''));
    var emailRegex = /^([0-9a-zA-Z_]([-.\w]*[0-9a-zA-Z_])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/gi;
    return emailRegex.test(anEmail);
}

/*checks if the street number is a valid number/ range
 * @param {string} x
 *@returns {boolean}
 */
function isAddressRangeValid(x) {
    var anAddressNumber = x.replace(/ /g, '');
    var myPattern = /(\d\-\d)|\d/g;
    return myPattern.test(anAddressNumber);
}

/*runs Service Qualification for Meriton Alcove apartments
 * @returns {boolean}
 */
function mockSq() {
    
    
    var streetNumber = $.trim($("#txtStreetNumber").val());
    var streetName = $.trim($("#txtStreetName").val().toLowerCase());
    var postCode = $.trim($("#txtPostCode").val().toLowerCase());
    
    if(typeof streetNumber != "undefined" || typeof streetNumber != "undefined"){
        streetNumber = streetNumber.toLowerCase();
    }
    
    var anAddressNumber = streetNumber.replace(/ /g, '');
    var myStreetNumPatt = /(132\-138)|(132)|(138)/gi;
    var isUnlimitedStreetNum = myStreetNumPatt.test(anAddressNumber);

    var myStreetNamePatt = /(Killeaton Street)|(Killeaton)/gi;
    var isUnlimitedStreetName = myStreetNamePatt.test(streetName);

    if (isUnlimitedStreetNum === true && isUnlimitedStreetName === true && postCode === 2075){
        return true;
    }
    else{
        return false;
    }
}

/*isVS3 Application will check the address entered to see if its part of the VS3 meriton buildings
 * @param   {void}
 * @return  {boolean} isVS3
 */

function isVS3Application(){
    var isVS3 = false;
    
    var suburb          = $.trim($("#txtSurburb").val().toLowerCase());
    var zetlandPattern  = /zetland/gi;
    
    
    
    //If address is in zetland continue with SQ if not then return false
    if(zetlandPattern.test(suburb)){ 
        
        var streetNumber    = ($.trim($("#txtStreetNumber").val().toLowerCase())).replace(/ /g, '');
        var streetName      = $.trim($("#txtStreetName").val().toLowerCase());
        
        var vs3_streetNumber1Pattern = /^(10|12|(10\-12){1}|(10\&12){1})$/gi;
        var vs3_streetNumber2Pattern = /^(1|3|(1\-3){1}|(1\&3){1})$/gi;
        var vs3_streetNumber3Pattern = /^(2|4|(2\-4){1}|(2\&4){1})$/gi;
    
        var vs3_streetName1Pattern = /^(defries avenue$)|(defries ave$)/gi;
        var vs3_streetName2Pattern = /^(naulty place$)|(naulty pl$)/gi;
        var vs3_streetName3Pattern = /^(bindon place$)|(bindon pl$)/gi;
        
        if(vs3_streetNumber1Pattern.test(streetNumber) && vs3_streetName1Pattern.test(streetName)){
            //If the address is 10-12 Defries Avenue
            isVS3 = true;
        }
        else if(vs3_streetNumber2Pattern.test(streetNumber) && vs3_streetName2Pattern.test(streetName)){
            //If the address is 1-3 Naulty Place
            isVS3 = true;
        }
        else if(vs3_streetNumber3Pattern.test(streetNumber) && vs3_streetName3Pattern.test(streetName)){
            //If the address is 2-4 Bindon Place
            isVS3 = true;
        }
        else{
            isVS3 = false;
        }            
    }
    else{
        isVS3 = false;
    }   
    return isVS3;
}

/*
 * resets the second page's divs when showing the plans
 * @returns {void}
 */
function resetPlan() {
    $("#userNameDiv").show();
    $("#InternetSec").show();
    $("#VoipSec").show();
    $("#contractSec").show();
    $("#accessories").show();
    $("#theError").hide();
}

/*prints the html confirmation tables 
 * @returns {void}
 */
function showConfirm() {
    showSection("#confirmDetails");
    var DataSec1 = captureSection1Data();

    var strIcontract = $("#ddlContract").val();
    var strPromoCode = $.trim($("#txtPromoCode").val());

    //Divs for the confirmation section
    var confirmPersonal = $("#confPersonal");
    var confirmService = $("#confService");

    var trState = DataSec1.STATE;
    var trProd = checkNet(DataSec1.NET_TYPE);
    var unitNumberDisplay = "";

    if (DataSec1.UNIT_NUM == null || DataSec1.UNIT_NUM == "")
        unitNumberDisplay = "";
    else
        unitNumberDisplay = DataSec1.UNIT_NUM + " /";


    var strpers = '<table  width="90%" border="0" cellpadding="0" cellspacing="0" class="form-table">' +
            '<tr> <th colspan="2">Personal Details</th></tr> ' +
            '<tr><td>Name: </td><td>' + DataSec1.FIRST_NAME + ' ' + DataSec1.LAST_NAME + '</td>' +
            '</tr><tr><td>Mobile Number: </td><td> ' + DataSec1.MOBILE_PHONE + '</td></tr>' +
            '<tr><td>Home Phone: </td><td>' + DataSec1.HOME_PHONE + '</td></tr>' +
            '<tr><td>Email Address: </td><td>' + DataSec1.EMAIL + '</td></tr>' +
            '<tr><td>Service Address: </td><td>' + unitNumberDisplay + '' + DataSec1.STREET_NUM + ' ' + DataSec1.STREET_NAME + '</td></tr>' +
            '<tr><td>Suburb: </td><td>' + DataSec1.SUBURB + ', ' + DataSec1.POSTCODE + ' </td></tr>' +
            '<tr><td>State: </td><td>' + trState + '</td></tr>' +
            '<tr><td>Product Type: </td><td>' + trProd + '</td></tr></table>';

    confirmPersonal.html(strpers);
    //draw table and show app type in header
    var service_html = '<table width="90%" border="0" cellpadding="0" cellspacing="0" class="form-table">' +
            '<tr> <th colspan="2">Service Type: ' + checkApp(DataSec1.SERVICE_REQ) + '</th></tr> ';


    //add internet row if it should be there
    if (DataSec1.SERVICE_REQ == Service.BOTH || DataSec1.SERVICE_REQ == Service.INET) {
        var strIplan = $("#ddlPlanoption").val();
        var strRouter = $("#ddlrouter").val();
        var username = $("#txtUsername").val();
        var portSpeed = $("input[name=radPortSpeed]:checked").val();
        var additionalCost = " ";
        
        if("50" == portSpeed ){
            additionalCost = "* <span class='error'> + $10</span>";
            portSpeed = portSpeed + "Mbps"
        }
        else if ("100" == portSpeed){
            additionalCost = "* <span class='error'> + $20</span>";
            portSpeed = portSpeed + "Mbps";
        }
        else if("25" == portSpeed || "8" == portSpeed){
            portSpeed = portSpeed + "Mbps";
        }
            
        
        service_html += '<tr><td>Desired Username: </td><td>' + username + '@fuzeconnect.net.au</td></tr>';
        service_html += '<tr><td>Internet Plan: </td><td>' + checkPlan(strIplan) + '</td></tr>';
        service_html += '<tr><td>Port Speed: </td><td>' + portSpeed + additionalCost +'</td></tr>';
        service_html += '<tr><td>Modem/Router: </td><td>' + checkRouter(strRouter) + '</td></tr>';

    }

    //add Phone Row if it should be there
    if (DataSec1.SERVICE_REQ == Service.BOTH || DataSec1.SERVICE_REQ == Service.PHONE) {
        var strVplan = $("#ddlVoipPlan").val();
        var strIplan = $("#ddlPlanoption").val();

        var numPort = $("#yesPort").is(":checked");
        var noPort = $("#noPort").is(":checked");
        var strNumToPort = $("#txtNumToPort").val();

        if (numPort)
        {
            service_html += '<tr><td>Phone Porting: </td><td> Yes Please</td></tr>';
            service_html += '<tr><td>Existing Number: </td><td>' + strNumToPort + ' </td></tr>';

        } else if (numPort == false || noPort == false)
        {
            service_html += '<tr><td>Phone Porting: </td><td> No Thanks</td></tr>';
        }
        
        if(strIplan == Plan.ON_DSL_UNLTD_BDL){
            service_html += '<tr><td>Phone Plan: </td><td> FUZEtalk Unlimited</td></tr>';
        }
        else{
            var phonePlanName = checkPlan(strVplan);
            if(null == phonePlanName){
                service_html += '<tr><td>Phone Plan: </td><td> No </td></tr>';
            }
            else 
                service_html += '<tr><td>Phone Plan: </td><td>' + checkPlan(strVplan) + '</td></tr>';
        }
        
    }
    //Add row for the conract option    
    service_html += '<tr><td>Service Contract: </td><td>' + checkContract(strIcontract) + '</td></tr>';
    //Add row for the Promo Code if its not empty
    if(strPromoCode != null || strPromoCode != ""){
        service_html += '<tr><td>Promo Code: </td><td>' + strPromoCode + '</td></tr>';
    }


    service_html += '</table>';

    confirmService.html(service_html);

}

/*showNetworks will show the list of available networks based on address
 * @param {boolean} vdslSpecial
 * returns {void}
 */
function showNetworks(vdslSpecial){
        var ddlservReq = $("#ddlNetType");
        var onNetRegex = /On-net unlimited/gi;
        console.log(fuzeNetworkSq);
        if (vdslSpecial) {
            var ProdTypeAvail = {
                "Select ..": Net.NO_OPT,
                "VDSL": Net.VDSL,
                "OnNet ADSL2+": Net.VDSL
            };
        } else if(onNetRegex.test(fuzeNetworkSq)){
            var ProdTypeAvail = {
                "Select ..": Net.NO_OPT,
                "OnNet ADSL2+": Net.ON_DSL
            };
        }
        else if(fuzeNetworkSq == "Wave7" || fuzeNetworkSq == "FttH" || fuzeNetworkSq == "AllOptics"){
            var ProdTypeAvail = {
                "Select ..": Net.NO_OPT,
                "Fibre / Ethernet": Net.FIBRE
            };
        }else if(fuzeNetworkSq == "DOCSIS 1" || fuzeNetworkSq == "DOCSIS 2"){
            var ProdTypeAvail = {
                "Select ..": Net.NO_OPT,
                "Cable": Net.CABLE
            };
        }
        else if(fuzeNetworkSq == "VDSL"){
            var ProdTypeAvail = {
                "Select ..": Net.NO_OPT,
                "VDSL / EOC": Net.VDSL,
                "OnNet ADSL2+": Net.ON_DSL
            };
        }
        else if(offNetApplication == true){
            var ProdTypeAvail = {
                "Select ..": Net.NO_OPT,
                "ADSL2+": Net.ADSL,
                "Naked ADSL 2+": Net.NAKEDADSL
            };
        }
        else {             
            var ProdTypeAvail = {
                "Select ..": Net.NO_OPT,
                "Fibre / Ethernet": Net.FIBRE,
                "VDSL / EOC": Net.VDSL,
                "Cable": Net.CABLE,
                "OnNet ADSL2+": Net.ON_DSL,
                "ADSL2+": Net.ADSL,
                "Naked ADSL 2+": Net.NAKEDADSL
            };
        }
        var myOutput = "";
        
        for (var key in ProdTypeAvail) {  
            $("#ddlNetType").empty();
            myOutput += '<option value ="' + ProdTypeAvail[key];
            myOutput += '">' + key + '</option>';
            ddlservReq.append(myOutput);
        }
}


/*showServices will show what services are available based on 
 *    the network type and other special requirements
 * @param{void}
 * @returns{void}
 */
function showServices() {
    var ddlservReq = $("#ddlservReq");

    var strNetType = $("#ddlNetType").val();

    var unltdADSLAvailable = mockSq(); //check if User is in Alcove
    var isVS3App = isVS3Application();// check if user is in Meriton VS3

    var servAvail = {};
    
    if(unltdADSLAvailable){
        //for Meriton Alcove
        servAvail = {
            "Select ..": Service.NO_OPT,
            "Phone & Internet": Service.BOTH,
            "Internet Only": Service.INET,
            "Phone Only": Service.PHONE
        };
    }
    else if(isVS3App){
        servAvail = {
            "Select ..": Service.NO_OPT,
            "Internet and Phone": Service.BOTH,
            "Internet Only": Service.INET
        };
    }
    else {
        if (strNetType == Net.FIBRE || strNetType == Net.VDSL) {
            //Fibre, VDSL and Cable Applications
            servAvail = {
                "Select ..": Service.NO_OPT,
                "Internet & Phone": Service.BOTH,
                "Internet Only": Service.INET,
                "Phone Only": Service.PHONE
            };
        }
        else if (strNetType == Net.ADSL || strNetType == Net.NAKEDADSL ) {
            //ADSL2+ and naked ADSL2+ applications
            servAvail = {
                "Select ..": Service.NO_OPT,
                "Internet Only": Service.INET
            };
        }
        else if (strNetType == Net.ON_DSL|| strNetType == Net.CABLE) {
            //On Net ADSL2+, Cable and VS3 applications
            servAvail = {
                "Select ..": Service.NO_OPT,
                "Internet and Phone": Service.BOTH,
                "Internet Only": Service.INET
            };
        }
        else {
            servAvail = {
                "Select ..": Service.NO_OPT};
        }
    }
    
    var myOutput = "";
    $("#ddlservReq").empty();
    for (var key in servAvail) {
        myOutput = '<option value ="' + servAvail[key];
        myOutput += '">' + key + '</option>';
        ddlservReq.append(myOutput);
    }
}

/*showNext1 will show the 2nd section of the application and will 
 * initiate validation of the data entered into section one
 * @param{void}
 * @returns{void}
 */
function showNext1() {
    var validated = false;
    validated = validateSection1();
    if (validated)
    {
        showSection("#serviceDetails");
        showPlan();
    }
}

/*takes user to the confirmation page for review of user data 
 * @param{void}
 * @returns{void}
 */
function showNext2() {
    var validated = false;
    validated = validateSection2();
    if (validated)
    {
        showSection("#confirmDetails");
        showConfirm();
    }
}
/*will take user back to the first page of the application
 * @param{void}
 * @returns{void}
 */
function showPrevious1() {
    var validated = false;
    validated = validateSection1();
    if (validated)    
        showSection("#applicantDetails");    
}

/*Will take user back to the 2nd page of the application
 * @param{void}
 * @returns{void} 
 */
function showPrevious2() {
    var validated = false;
    validated = validateSection2();
    if (validated)    
        showSection("#serviceDetails");    
}
