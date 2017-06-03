export class EventModal {
    haveTuition: boolean;
    subjects: string[];
    strongAtSubjects: string[];
    weakAtSubjects: string[];
    attractionToSubjects: string[];
    interest: string[];
    hobbies: string[];
    diagnosticReason: string[];
    specialRemarks: string;
    

    parentRelation: string;
    parentFirstname: string;
    parentLastName: string;    
    parentAge: number;
    parentProffesion: string;
    parentEmail: string;
    parentMobilePhone: string
    parentBestTimeToContact: string;

    childFirstName: string;
    childLastName: string;
    childAge: number;
    childGender: string
    childMobilePhone: string;
    childAddress: string;
    childStreet: string
    childPostcode: string;
    childDity: string;
    childBirthplace: string;
    childBirthdate: Date;
    currentInstiturionName:string;
    currentInstiturionCity:string;
    currentInstiturionClass:string;
    currentInstiturionOption:string;


  
    languagelv1:string;
    languagelv2:string;
    languagelv3:string;
    siblingsAge:number;
    siblingsstudyLevel:string;

  
    jobs: [{
        "proffesions": "",
        "age": 0
    }, {
            "proffesions": "Grand Teacher",
            "age": 25
        }];
    primarySchools: [{
        "name": "Lycee Saint-Charles",
        "repeatedClass": "Abcd",
        "reason": "Some text Here"
    }];
    secondarySchools: [{
        "name": "",
        "repeatedClass": "",
        "reason": ""
    }]

    constructor() {



    }


}



