export class ConstantsLib {
    static readonly CITY = "Bath";
    static readonly OVERSEAS_COUNTRY = "Cuba";
    static readonly RESPONSE_YES = "Yes";
    static readonly RESPONSE_NO = "No";
    static readonly DOB_11_11_1988 = "11/11/1988";
    static readonly SAS_HOF_EMAIL = requiredEnv('SAS_HOF_EMAIL');
    static readonly REF_NUMBER = "ZW9005196";
    static readonly TELEPHONE = "01616699548";
    static readonly IN_THE_UK = "In the UK";
    static readonly OUTSIDE_OF_THE_UK = "Outside of the UK";
    static readonly APPLICANT_FULL_NAME = "APPLICANT HOF-TEST";
    static readonly COUNTRY_OF_NATIONALITY = "PANAMA";
    static readonly NAME = "AUTO TESTER";
    static readonly NEGATIVE = "Negative";
    static readonly POSITIVE = "Positive";
    static readonly IHS_SERVICE_FEE = "Immigration Health Surcharge (IHS) fee";
    static readonly EU_SETTLEMENT_SCHEME_FEE = "EU Settlement Scheme fee";
    static readonly APPLICANT_DOB_11_11_1985 = "11/11/1985";
    static readonly UPLOAD_FILE_NAME = 'ukVic.png';
    static readonly COMPLAINT_DETAILS = 'Missing documents';
    static readonly APPLICATION_MONTH = 'July';
    static readonly CALL_DATE = '30 April';
    static readonly CALL_TIME = 'morning';
    static readonly Submit_Application = "Submitting an application";
    static readonly Make_Appointment = "Making an appointment";
    static readonly Wait_For_Decision = "Waiting for a decision or documents";
    static readonly Decision = "A negative or positive decision";
    static readonly Brp_Permits = "Biometric residence permits (BRPs)";
    static readonly Refunds = "Refunds";
    static readonly Staff_Behaviour = "Staff Behaviour (e.g. rudeness, discrimination)";
    static readonly Existing_Complaint = "An existing complaint";
    static readonly Something_Else = "Something else";
    static readonly Technical_Issues = "Technical issues with the website or payments";
    static readonly Unclear_Guidance = "Unclear or misleading guidance";
    static readonly Application_Decision = "A decision on an application";
    static readonly Return_Some_Doc = "The return of some documents";
    static readonly Less_Than_6Wks = "Less than 6 weeks ago";
    static readonly More_Than_6Wks = "More than 6 weeks ago";
}

function requiredEnv(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`${name} is not configured`);
    }
    return value;
}