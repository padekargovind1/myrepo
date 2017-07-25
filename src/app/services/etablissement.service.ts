import { Injectable } from '@angular/core';
import { SchoolCycleMdl } from '../model/school-cycle.model';

@Injectable()
export class EtablissementService {

  constructor() { }

  fillSchoolData(schoolData){
    let school = new SchoolCycleMdl();
    console.log(school);

    school.ad1=schoolData.cycles[0].cycle.address.ad1;
    school.ad2=schoolData.cycles[0].cycle.address.ad2;
    school.postalCode=schoolData.cycles[0].cycle.address.postCode;
    school.city=schoolData.cycles[0].cycle.address.city;
    school.country=schoolData.cycles[0].cycle.address.country;
    school.academic=schoolData.cycles[0].cycle.address.academy;
    school.departement=schoolData.cycles[0].cycle.address.departementName;
    school.region=schoolData.cycles[0].cycle.address.region;
    school.tel=schoolData.cycles[0].cycle.address.phoneNumber;
    school.urlWeb=schoolData.cycles[0].cycle.address.url;
    school.mel=schoolData.cycles[0].cycle.address.email;
    school.flexibleTime=schoolData.cycles[0].cycle.specifications.flexibleTimeframe.value;
    school.advanced=schoolData.cycles[0].cycle.specifications.advanced.value;
    school.finance=schoolData.cycles[0].cycle.specifications.finance.value;
    school.foreignFrench=schoolData.cycles[0].cycle.specifications.foreignFrench.value;
    school.handicaped=schoolData.cycles[0].cycle.specifications.handicaped.value;
    school.transport=schoolData.cycles[0].cycle.specifications.transports;
    school.internat=schoolData.cycles[0].cycle.boarding.boarding.value;
    school.capacity=schoolData.cycles[0].cycle.boarding.capacity;
    school.internatComments=schoolData.cycles[0].cycle.boarding.boarding.comment;
    school.onSite=schoolData.cycles[0].cycle.boarding.onSite.value;
    school.notOnSite=schoolData.cycles[0].cycle.boarding.notOnSite.value;
    school.resident=schoolData.cycles[0].cycle.boarding.residence.value;
    school.weekdays=schoolData.cycles[0].cycle.boarding.weekdays.value;
    school.fulltime=schoolData.cycles[0].cycle.boarding.fulltime.value;
    school.someweek=schoolData.cycles[0].cycle.boarding.someWeekEnds.value;
    school.internatMixte=schoolData.cycles[0].cycle.boarding.mixed.value;
    school.internatGirls=schoolData.cycles[0].cycle.boarding.girls.value;
    school.internatBoys=schoolData.cycles[0].cycle.boarding.boys.value;
    school.individual=schoolData.cycles[0].cycle.boarding.individual.value;
    school['2to4']=schoolData.cycles[0].cycle.boarding['2to4'].value;
    school['5to8']=schoolData.cycles[0].cycle.boarding['5to8'].value;
    school.dormitories=schoolData.cycles[0].cycle.boarding.dormitories.value;
    school.price=schoolData.cycles[0].cycle.boarding.cost;
    school.organisationCourse=schoolData.cycles[0].cycle.extraCuriculumn.courseOrganization;
    school.preIntake=schoolData.cycles[0].cycle.extraCuriculumn.preIntakeTraining.value;
    school.smallHoliday=schoolData.cycles[0].cycle.extraCuriculumn.smallHolidaysTraining.value;
    school.bigHoliday=schoolData.cycles[0].cycle.extraCuriculumn.bigHolidaysTraining.value;
    school.selfService=schoolData.cycles[0].cycle.canteen.selfService.value;
    school.serviceAtTable=schoolData.cycles[0].cycle.canteen.serviceAtTable.value;
    school.cafetaria=schoolData.cycles[0].cycle.canteen.cafeteria.value;
    school.externat=schoolData.cycles[0].cycle.externat.externat.value;
    school.externatMixte=schoolData.cycles[0].cycle.externat['demi-pension_mixte'].value;
    school.externatBoys=schoolData.cycles[0].cycle.externat['demi-pension_gars'].value;
    school.externatGirls=schoolData.cycles[0].cycle.externat['demi-pension_fille'].value;
    school.autoContact=schoolData.cycles[0].cycle.externat['demi-pension_gars'].value;
    school.autoWebsite=schoolData.cycles[0].cycle.autorisations.autorizations1desc;
    school.autoWeb1=schoolData.cycles[0].cycle.autorisations.autorizations1;
    // school.autoWeb2=schoolData.cycles[0].cycle.autorisations.
    school.mailingList=schoolData.cycles[0].cycle.autorisations.mailing.value;
    school.statMailing=schoolData.cycles[0].cycle.autorisations.ficheLink;
    school.statImmediat=schoolData.cycles[0].cycle.autorisations.immediate;
    school.statQuotidien=schoolData.cycles[0].cycle.autorisations.daily;
    school.statHebdo=schoolData.cycles[0].cycle.autorisations.weekly;
    school.statMensuel=schoolData.cycles[0].cycle.autorisations.monthly;

    return school;
  }

  fillEssentielData(schoolDataToFill, schoolData){
    let school = schoolDataToFill;

    school.shortName = schoolData.shortName;
    school.numberOfStudents = schoolData.numberOfStudents;
    school.creationYear = schoolData.creationYear;
    school.academic = schoolData.address.academy;
    school.departement = schoolData.address.departementName;
    school.tel = schoolData.address.phoneNumber;
    school.website = schoolData.address.url;
    school.mel = schoolData.address.email;
    school.title = "Mme";
    school.firstName = "Anita";
    school.lastName = "Lubies";
    school.fonction = "Directrice";
    school.dirCycle = "Apprentissages Premiers"

    return school;
  }

}
