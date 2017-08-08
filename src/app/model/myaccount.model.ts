export class MyAccountMdl{
  firstName: string = "A compléter";
  lastName: string = "A compléter";
  firstName1: string = "A compléter";
  firstName2: string = "A compléter";
  gender: string = "A compléter";
  birthDate : string = "A compléter";
  birthPlace : string = "A compléter";
  nationality : string = "A compléter";
  disabilityStatus : boolean=true;
  studiesFinancedBy: [string] = [null];
  photo: boolean = true;
  landlinePhone: string = "A compléter";
  mobilePhone: string = "A compléter";
  email: string = "A compléter";
  emailValidationCode: string = "A compléter";
  currentClass: string = "A compléter";
  currentClassType: string = "A compléter";
  age : string ="A compléter";
  parents = [];
  address : any;
  socialAddresses : any;
  academicHistories: [any] = [null];
  bulletins :[any] = [null];
  siblings :[MyAccountSiblingsMdl] = [null];
}

export class MyAccountAdresse{
    address1: string="A compléter";
    address2: string="A compléter";
    postCode: string="A compléter";
    city: string="A compléter";
    country: string="A compléter"
}

export class MyAccountSocialAdrMdl{
    facebookUrl: string="A compléter";
    instagramUrl: string="A compléter";
    googleUrl: string="A compléter";
    twitterUrl: string="A compléter"
}

export class MyAccountHistoryMdl{
    fromYear= "2000";
    toYear="2001";
    class: string="A compléter";
    classType: string="A compléter";
    languages: [string]=["A compléter"];
    schoolName: string="A compléter";
    schoolType: string="A compléter";
    city: string="A compléter"
}

export class MyAccountBulletin{
    path: string="A compléter"
}

export class MyAccountParentMdl{
    relationship: string="A compléter";
    firstName: string="A compléter";
    lastName: string="A compléter";
    gender: string="A compléter";
    profession: string="A compléter";
    phoneNumber: string="A compléter";
    email: string="A compléter";
    address: any
}

export class MyAccountSiblingsMdl{
    age : string ="0";
    gender : string ="A compléter";
    study : string ="A compléter"
}