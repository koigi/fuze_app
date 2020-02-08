<?php

include_once('vtwsclib/Vtiger/WSClient.php');

function vtws_login() {
    $config_ini = parse_ini_file("fuzeconnect_vtws_config.ini");
    //print_r($ini_array);
    $url = $config_ini['URL'];
    $client = new Vtiger_WSClient($url);
    $login = $client->doLogin($config_ini['username'], $config_ini['accesskey']);
    if (!$login)
        return null;
    return $client;
}

function vtws_createleads_page1($fieldvalue_array) {
    $fieldname_array = array('firstname', 'lastname', 'phone', 'mobile', 'email', 'cf_462',
        'cf_464', 'lane', 'city', 'state', 'code', 'country', 'cf_684', 'cf_1040', "cf_1039");
    $values = array_combine($fieldname_array, $fieldvalue_array);
    $values['company'] = $values['firstname'] . " " . $values['lastname'];
    $module = 'Leads';
    $return_value = vtws_createrecord($module, $values);
    return $return_value;
}

function vtws_updateleads_page2($recordid, $fieldvalue_array) {
    $fieldname_array = array('cf_482', 'cf_546', 'cf_548', 'cf_542', 'cf_540', "cf_714", "cf_484");
    $values = array_combine($fieldname_array, $fieldvalue_array);
    $return_value = vtws_updaterecord($recordid, $values);
    return $return_value;
}

function vtws_convertleads($recordid) {
    $client = vtws_login();
    if ($client != null) {
        $recordInfo = $client->doRetrieve($recordid);
        $wasError = $client->lastError();
        if ($wasError) {
            return $wasError['code'] . ':' . $wasError['message'];
        }
        if ($recordInfo) {
            $client1 = vtws_login();
            $convert_lead_array = array();
            $convert_lead_array['leadId'] = $recordInfo['id'];
            $convert_lead_array['assignedTo'] = $recordInfo['assigned_user_id'];
            $convert_lead_array['entities']['Accounts']['create'] = true;
            $convert_lead_array['entities']['Accounts']['name'] = 'Accounts';
            $convert_lead_array['entities']['Accounts']['accountname'] = $recordInfo['company'];
            $convert_lead_array['entities']['Accounts']['industry'] = $recordInfo['industry'];
            $convert_lead_array['entities']['Potentials']['create'] = true;
            $convert_lead_array['entities']['Potentials']['name'] = 'Potentials';
            $convert_lead_array['entities']['Potentials']['potentialname'] = $recordInfo['company'];
            $convert_lead_array['entities']['Potentials']['closingdate'] = date("Y-m-d", strtotime("+1 week Saturday"));
            $convert_lead_array['entities']['Potentials']['sales_stage'] = 'Prospecting';
            $convert_lead_array['entities']['Potentials']['amount'] = 0;
            $convert_lead_array['entities']['Contacts']['create'] = true;
            $convert_lead_array['entities']['Contacts']['name'] = 'Contacts';
            $convert_lead_array['entities']['Contacts']['lastname'] = $recordInfo['lastname'];
            $convert_lead_array['entities']['Contacts']['firstname'] = $recordInfo['firstname'];
            $convert_lead_array['entities']['Contacts']['email'] = $recordInfo['email'];
            //echo '<pre>';print_r($convert_lead_array);die;
            $convert_lead_json = json_encode($convert_lead_array);
            $response = $client1->doInvoke('convertlead', array('element' => $convert_lead_json));
            $wasError = $client1->lastError();
            if ($wasError) {
                return $wasError['code'] . ':' . $wasError['message'];
            } else {
                return 1;
            }
        }
    } else {
        return 'Login failed';
    }
}

function vtws_checkusername($username) {
    $username = $username . "@fuzeconnect.net.au";
    $query = "SELECT * FROM Accounts WHERE cf_500 = '" . $username . "'";
    $records = vtws_queryrecord($query);
    if (is_array($records)) {
        if (empty($records)) {
            return 0;
        } else {
            return 1;
        }
    } else {
        return $records;
    }
}

function vtws_createleads_campaign($fieldvalue_array) {
    $fieldname_array = array('cf_1038', 'firstname', 'email', 'phone');
    $values = array_combine($fieldname_array, $fieldvalue_array);
    $values['lastname'] = $values['firstname'];
    $values['company'] = $values['firstname'] . " " . $values['lastname'];
    $module = 'Leads';
    $return_value = vtws_createrecord($module, $values);
    return $return_value;
}

function vtws_pullaccounts($username) {
    $username = $username . "@fuzeconnect.net.au";
    $query = "SELECT * FROM Accounts WHERE cf_500 = '" . $username . "'";
    $records = vtws_queryrecord($query);
    // echo '<pre>';print_r($records);die;
    if (is_array($records)) {
        $values = array();
        $values['id'] = $records[0]['id'];
        $values['accountname'] = $records[0]['accountname'];
        $values['phone'] = $records[0]['phone'];
        $values['otherphone'] = $records[0]['otherphone'];
        $values['email1'] = $records[0]['email1'];
        $values['email2'] = $records[0]['email2'];
        $values['bill_street'] = $records[0]['bill_street'];
        $values['bill_pobox'] = $records[0]['bill_pobox'];
        $values['bill_city'] = $records[0]['bill_city'];
        $values['bill_state'] = $records[0]['bill_state'];
        $values['bill_code'] = $records[0]['bill_code'];
        $values['bill_country'] = $records[0]['bill_country'];
        $values['ship_street'] = $records[0]['ship_street'];
        $values['ship_pobox'] = $records[0]['ship_pobox'];
        $values['ship_city'] = $records[0]['ship_city'];
        $values['ship_state'] = $records[0]['ship_state'];
        $values['ship_code'] = $records[0]['ship_code'];
        $values['password'] = $records[0]['cf_502'];
        return $values;
    } else {
        return $records;
    }
}

function vtws_updateaccounts($fieldvalue_array) {
    $fieldname_array = array('id', 'accountname', 'phone', 'cf_948', 'email1', 'email2', 'bill_street', 'bill_pobox', 'bill_city', 'bill_state', 'bill_code',
        'bill_country', 'ship_street', 'ship_pobox', 'ship_city', 'ship_state', 'ship_code', 'cf_502');
    $values = array_combine($fieldname_array, $fieldvalue_array);
    $return_value = vtws_updaterecord($values['id'], $values);
    return $return_value;
}

function vtws_pullticket($accountid) {
    $query = "SELECT * FROM HelpDesk WHERE parent_id = '" . $accountid . "'";
    $records = vtws_queryrecord($query);
    return $records;
}

function vtws_createticket($fieldvalue_array) {
    $fieldname_array = array('parent_id', 'ticket_title', 'description', 'ticketpriorities', 'ticketstatus');
    $values = array_combine($fieldname_array, $fieldvalue_array);
    $module = 'HelpDesk';
    $return_value = vtws_createrecord($module, $values);
    return $return_value;
}

function vtws_createrecord($module, $values) {
    $client = vtws_login();
    if ($client != null) {
        $record = $client->doCreate($module, $values);
        $wasError = $client->lastError();
        if ($wasError) {
            return $wasError['code'] . ':' . $wasError['message'];
        }
        if ($record) {
            $recordid = $record['id'];
            return $recordid;
        }
    } else {
        return 'Login failed';
    }
}

function vtws_updaterecord($recordid, $values) {
    $client = vtws_login();
    if ($client != null) {
        $recordInfo = $client->doRetrieve($recordid);
        $wasError = $client->lastError();
        if ($wasError) {
            return $wasError['code'] . ':' . $wasError['message'];
        }
        if ($recordInfo) {
            foreach ($values as $key => $value) {
                $recordInfo[$key] = $value;
            }
            $update = $client->doUpdate($recordInfo);
            return $update['id'];
        }
    } else {
        return 'Login failed';
    }
}

function vtws_queryrecord($query) {
    $client = vtws_login();
    if ($client != null) {
        $records = $client->doQuery($query);
        $wasError = $client->lastError();
        if ($wasError) {
            return $wasError['code'] . ':' . $wasError['message'];
        }
        return $records;
    } else {
        return 'Login failed';
    }
}

function vtws_pullinvoice($accountid) {
    $query = "SELECT * FROM Invoice WHERE account_id = '" . $accountid . "'";
    //$query = "SELECT * FROM Invoice ";
    $records = vtws_queryrecord($query);
    return $records;
}
/*
 * vtws_convertleads2 modified to accomodate Port speed, and other components of a lead
 * @param {string} recordid
 * @param {array} formData
 * @return {string} 
 */
function vtws_convertleads2($recordid, $formData) {
    $portSpeed = null;
    if ("ADSL" == $formData['Port Speed'])
        $portSpeed = "ADSL2+";
    else if("No Internet" == $formData['Port Speed'])
        $portSpeed = "No Internet";
    else
        $portSpeed = $formData['Port Speed'] . "Mbps";

    $client = vtws_login();
    if ($client != null) {
        $recordInfo = $client->doRetrieve($recordid);
        $wasError = $client->lastError();
        if ($wasError) {
            return $wasError['code'] . ':' . $wasError['message'];
        }
        if ($recordInfo) {
            $client1 = vtws_login();
            $convert_lead_array = array();
            $convert_lead_array['leadId'] = $recordInfo['id'];
            $convert_lead_array['assignedTo'] = $recordInfo['assigned_user_id'];
            $convert_lead_array['entities']['Accounts']['create'] = true;
            $convert_lead_array['entities']['Accounts']['name'] = 'Accounts';
            $convert_lead_array['entities']['Accounts']['accountname'] = $recordInfo['company'];
            $convert_lead_array['entities']['Accounts']['cf_672'] = 'New';
            $convert_lead_array['entities']['Accounts']['phone'] = $formData['Mobile Number'];
            $convert_lead_array['entities']['Accounts']['othernumber'] = $formData['Home Number'];
            $convert_lead_array['entities']['Accounts']['cf_720'] = $formData['Router Option'];
            $convert_lead_array['entities']['Accounts']['cf_1031'] = $portSpeed;
            $convert_lead_array['entities']['Accounts']['industry'] = $recordInfo['industry'];
            $convert_lead_array['entities']['Potentials']['create'] = true;
            $convert_lead_array['entities']['Potentials']['name'] = 'Potentials';
            $convert_lead_array['entities']['Potentials']['potentialname'] = $recordInfo['company'];
            $convert_lead_array['entities']['Potentials']['closingdate'] = date('Y-m-d', strtotime('+1 week Saturday'));
            $convert_lead_array['entities']['Potentials']['sales_stage'] = 'Prospecting';
            $convert_lead_array['entities']['Potentials']['amount'] = 0;
            $convert_lead_array['entities']['Contacts']['create'] = true;
            $convert_lead_array['entities']['Contacts']['name'] = 'Contacts';
            $convert_lead_array['entities']['Contacts']['lastname'] = $recordInfo['lastname'];
            $convert_lead_array['entities']['Contacts']['firstname'] = $recordInfo['firstname'];
            $convert_lead_array['entities']['Contacts']['email'] = $recordInfo['email'];
            $convert_lead_json = json_encode($convert_lead_array);
            $response = $client1->doInvoke('convertlead', array('element' => $convert_lead_json));
            if ($wasError) {
                return $wasError['code'] . ':' . $wasError['message'];
            } else {
                return $response;
            }
        }
    } else {
        return 'Login failed';
    }
}
/*updated to accept entered username in the application and also 
 * @param {array} $fieldvalue_array
 */
function vtws_updateaccounts2($fieldvalue_array) {
    $fieldname_array = array('id', 'cf_500', 'cf_1041');
    $values = array_combine($fieldname_array, $fieldvalue_array);
    $return_value = vtws_updaterecord($values['id'], $values);
    return $return_value;
}

function vtws_pullaccount($uid) {
    $client = vtws_login();
    if ($client != null) {
        $recordInfo = $client->doRetrieve($uid);
        $wasError = $client->lastError();
        if ($wasError) {
            return $wasError['code'] . ':' . $wasError['message'];
        }
        else
            return $recordInfo;
    } else {
        return 'Login failed';
    }
}


?>
