import { Injectable } from '@angular/core';
import { SchoolCycleMdl } from '../model/school-cycle.model';

@Injectable()
export class EtablissementService {

  constructor() { }

  fillSchoolData(schoolData, index){
    let school = new SchoolCycleMdl();
    console.log(school);

    school.ad1=schoolData.cycles[index].cycle.address.ad1;
    school.ad2=schoolData.cycles[index].cycle.address.ad2;
    school.postalCode=schoolData.address.postCode;
    school.city=schoolData.cycles[index].cycle.address.city;
    school.country=schoolData.cycles[index].cycle.address.country;
    school.academic=schoolData.cycles[index].cycle.address.academy;
    school.departement=schoolData.address.departmentName;
    school.region=schoolData.cycles[index].cycle.address.region;
    school.tel=schoolData.cycles[index].cycle.address.phoneNumber;
    school.urlWeb=schoolData.cycles[index].cycle.address.url;
    school.mel=schoolData.cycles[index].cycle.address.email;
    school.flexibleTime=schoolData.cycles[index].cycle.specifications.flexibleTimeframe.value;
    school.advanced=schoolData.cycles[index].cycle.specifications.advanced.value;
    school.finance=schoolData.cycles[index].cycle.specifications.finance.value;
    school.foreignFrench=schoolData.cycles[index].cycle.specifications.foreignFrench.value;
    school.handicaped=schoolData.cycles[index].cycle.specifications.handicaped.value;
    school.transport=schoolData.cycles[index].cycle.specifications.transports;
    school.internat=schoolData.cycles[index].cycle.boarding.boarding.value;
    school.capacity=schoolData.cycles[index].cycle.boarding.capacity;
    school.internatComments=schoolData.cycles[index].cycle.boarding.boarding.comment;
    school.onSite=schoolData.cycles[index].cycle.boarding.onSite.value;
    school.notOnSite=schoolData.cycles[index].cycle.boarding.notOnSite.value;
    school.resident=schoolData.cycles[index].cycle.boarding.residence.value;
    school.weekdays=schoolData.cycles[index].cycle.boarding.weekdays.value;
    school.fulltime=schoolData.cycles[index].cycle.boarding.fulltime.value;
    school.someweek=schoolData.cycles[index].cycle.boarding.someWeekEnds.value;
    school.internatMixte=schoolData.cycles[index].cycle.boarding.mixed.value;
    school.internatGirls=schoolData.cycles[index].cycle.boarding.girls.value;
    school.internatBoys=schoolData.cycles[index].cycle.boarding.boys.value;
    school.individual=schoolData.cycles[index].cycle.boarding.individual.value;
    school['2to4']=schoolData.cycles[index].cycle.boarding['2to4'].value;
    school['5to8']=schoolData.cycles[index].cycle.boarding['5to8'].value;
    school.dormitories=schoolData.cycles[index].cycle.boarding.dormitories.value;
    school.price=schoolData.cycles[index].cycle.boarding.cost;
    school.organisationCourse=schoolData.cycles[index].cycle.extraCuriculumn.courseOrganization;
    school.preIntake=schoolData.cycles[index].cycle.extraCuriculumn.preIntakeTraining.value;
    school.smallHoliday=schoolData.cycles[index].cycle.extraCuriculumn.smallHolidaysTraining.value;
    school.bigHoliday=schoolData.cycles[index].cycle.extraCuriculumn.bigHolidaysTraining.value;
    school.selfService=schoolData.cycles[index].cycle.canteen.selfService.value;
    school.serviceAtTable=schoolData.cycles[index].cycle.canteen.serviceAtTable.value;
    school.cafetaria=schoolData.cycles[index].cycle.canteen.cafeteria.value;
    school.externat=schoolData.cycles[index].cycle.externat.externat.value;
    school.externatMixte=schoolData.cycles[index].cycle.externat['demi-pension_mixte'].value;
    school.externatBoys=schoolData.cycles[index].cycle.externat['demi-pension_gars'].value;
    school.externatGirls=schoolData.cycles[index].cycle.externat['demi-pension_fille'].value;
    school.autoContact=schoolData.cycles[index].cycle.externat['demi-pension_gars'].value;
    school.autoWebsite=schoolData.cycles[index].cycle.autorisations.autorizations1desc;
    school.autoWeb1=schoolData.cycles[index].cycle.autorisations.autorizations1;
    // school.autoWeb2=schoolData.cycles[index].cycle.autorisations.
    school.mailingList=schoolData.cycles[index].cycle.autorisations.mailing.value;
    school.statMailing=schoolData.cycles[index].cycle.autorisations.ficheLink;
    school.statImmediat=schoolData.cycles[index].cycle.autorisations.immediate;
    school.statQuotidien=schoolData.cycles[index].cycle.autorisations.daily;
    school.statHebdo=schoolData.cycles[index].cycle.autorisations.weekly;
    school.statMensuel=schoolData.cycles[index].cycle.autorisations.monthly;
    school.cycleName=schoolData.cycles[index].cycle.cycle.nom;
    school.postalCode=schoolData.cycles[index].cycle.cycle.nom;
    return school;
  }

  fillEssentielData(schoolDataToFill, schoolData){
    let school = schoolDataToFill;

    school.shortName = schoolData.shortName;
    school.numberOfStudents = schoolData.numberOfStudents;
    school.creationYear = schoolData.creationYear;
    school.academic = schoolData.address.academy;
    school.departement = schoolData.address.departmentName;
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

  getSchoolToDisplay(){
    const data = [];

    data.push({
      cycle : {
        cycle : {
          nom : "test"
        }
      }
    })

    return data;
  }

}
