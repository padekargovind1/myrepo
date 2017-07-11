export class MyAccountMdl{
  firstName: string = "";
  lastName: string = "";
  firstName1: string = "";
  firstName2: string = "";
  gender: string = "";
  birthDate : string = "";
  birthPlace : string = "";
  nationality : string = "";
  disabilityStatus : boolean=true;
  studiesFinancedBy: [string] = [null];
  photo: boolean = true;
  landlinePhone: string = "";
  mobilePhone: string = "";
  email: string = "";
  emailValidationCode: string = "";
  currentClass: string = "";
  currentClassType: string = "";
  parents : [any] = [null];
  address : any;
  socialAddresses : any;
  academicHistories: [any] = [null];
  bulletins :[any] = [null]
}

export class MyAccountAdresse{
    address1: string="";
    address2: string="";
    postCode: string="";
    city: string="";
    country: string=""
}

export class MyAccountSocialAdrMdl{
    facebookUrl: string="";
    instagramUrl: string="";
    googleUrl: string="";
    twitterUrl: string=""
}

export class MyAccountHistoryMdl{
    fromYear : string="";
    toYear: string="";
    class: string="";
    classType: string="";
    languages: [string] = [null];
    schoolName: string="";
    schoolType: string="";
    city: string=""
}

export class MyAccountBulletin{
    path: string=""
}

export class MyAccountParentMdl{
    relationship: string="";
    firstName: string="";
    lastName: string="";
    gender: string="";
    profession: string="";
    phoneNumber: string="";
    email: string="";
    address: any
}