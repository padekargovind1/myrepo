export class AdvancedSearchMdl{
  speciality: any;
  boarding: any;
  curriculum: any;
  canteen: any;
  external: any;
  status: any;
  religious: any;
  language: any;
  sections: any;
  diplomas: any;
  options: any;
  seats: any
}

export class SpecialityMdl{
    handicapped: boolean = false;
    finance: boolean = false;
    frenchAsForeign: boolean = false;
    advanced: boolean = false;
    flexible: boolean = false
}

export class BoardingMdl{
    boarding: boolean= false;
    capacity= 0;
    onSite: boolean= false;
    notOnSite: boolean= false;
    residence: boolean= false;
    weekdays: boolean= false;
    fulltime: boolean= false;
    someweekends: boolean= false;
    mixed: boolean= false;
    girls: boolean= false;
    boys: boolean= false;
    individual: boolean= false;
    '2to4': boolean= false;
    '5to8': boolean= false;
    dormitories: boolean= false
}

export class CurriculumMdl{
    preintake: boolean = false;
    smallholidays: boolean = false;
    bigholidays: boolean = false
}

export class CanteenMdl{
    'self-service': boolean = false;
    serviceAtTable: boolean = false;
    cafeteria: boolean = false
}

export class ExternalMdl{
    external: boolean = false;
    'half-board_mixed': boolean = false;
    'half-board_boys': boolean = false;
    'half-board_girls': boolean = false
}

export class StatusMdl{
    public: boolean = false;
    private: boolean = false;
    CCI: boolean = false;
    association: boolean = false;
    outContract: boolean = false;
    CFA: boolean = false;
    UFA: boolean = false;
    recognized: boolean = false;
    convention: boolean = false;
    higherEducationFree: boolean = false;
    higherEducation: boolean = false;
    technical: boolean = false;
    simple: boolean = false
}

export class ReligiousMdl{
    secular: boolean = false;
    religious: boolean = false;
    catholic: boolean = false;
    protestant: boolean = false;
    muslim: boolean = false;
    jew: boolean = false;
    boudhist: boolean = false
}

export class LanguageMdl{
    lv1="" ;
    lv2="" ;
    lv3="" ;
    la="" ;
    lr="" 
}

export class SectionMdl{
    european: boolean = false;
    international: boolean = false;
    bilingual: boolean = false;
    sport: boolean = false
}

export class DiplomaMdl{
    diploma= ""
}

export class OptionMdl{
    option= ""
}

export class SeatsMdl{
    available: boolean = false
}