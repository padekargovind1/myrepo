import { Injectable } from '@angular/core';
import { SchoolCycleMdl } from '../model/school-cycle.model';

@Injectable()
export class EtablissementService {

  constructor() { }

  fillSchoolData(schoolData, index){
    let school = new SchoolCycleMdl();
    console.log(school);

    school.ad1=schoolData.cycles[index].address.ad1;
    school.ad2=schoolData.cycles[index].address.ad2;
    school.postalCode=schoolData.address.postcode;
    school.city=schoolData.cycles[index].address.city;
    school.country=schoolData.cycles[index].address.country;
    school.academic=schoolData.cycles[index].address.academy;
    school.departement=schoolData.address.departmentName;
    school.region=schoolData.cycles[index].address.region;
    school.tel=schoolData.cycles[index].address.phoneNumber;
    school.urlWeb=schoolData.cycles[index].address.url;
    school.mel=schoolData.cycles[index].address.email;
    school.flexibleTime=schoolData.cycles[index].specifications.flexibleTimeFrame.value;
    
    school.advanced=schoolData.cycles[index].specifications.advanced.value;
    school.finance=schoolData.cycles[index].specifications.finance.value;
    school.foreignFrench=schoolData.cycles[index].specifications.foreignFrench.value;
    school.handicaped=schoolData.cycles[index].specifications.handicapped.value;
    school.transport=schoolData.cycles[index].specifications.transports;
    school.internat=schoolData.cycles[index].boarding.boarding.value;
    school.capacity=schoolData.cycles[index].boarding.capacity;
    school.internatComments=schoolData.cycles[index].boarding.boarding.comment;
    school.onSite=schoolData.cycles[index].boarding.onSite.value;
    school.notOnSite=schoolData.cycles[index].boarding.notOnSite.value;
    school.resident=schoolData.cycles[index].boarding.residence.value;
    school.weekdays=schoolData.cycles[index].boarding.weekdays.value;
    school.fulltime=schoolData.cycles[index].boarding.fulltime.value;
    school.someweek=schoolData.cycles[index].boarding.someWeekEnds.value;
    school.internatMixte=schoolData.cycles[index].boarding.mixed.value;
    school.internatGirls=schoolData.cycles[index].boarding.girls.value;
    school.internatBoys=schoolData.cycles[index].boarding.boys.value;
    school.individual=schoolData.cycles[index].boarding.individual.value;
    school['2to4']=schoolData.cycles[index].boarding['2to4'].value;
    school['5to8']=schoolData.cycles[index].boarding['5to8'].value;
    school.dormitories=schoolData.cycles[index].boarding.dormitories.value;
    school.price=schoolData.cycles[index].boarding.cost;
    school.organisationCourse=schoolData.cycles[index].extraCuriculumn.courseOrganization;
    school.preIntake=schoolData.cycles[index].extraCuriculumn.preIntakeTraining.value;
    school.smallHoliday=schoolData.cycles[index].extraCuriculumn.smallHolidaysTraining.value;
    school.bigHoliday=schoolData.cycles[index].extraCuriculumn.bigHolidaysTraining.value;
    school.selfService=schoolData.cycles[index].canteen.selfService.value;
    school.serviceAtTable=schoolData.cycles[index].canteen.serviceAtTable.value;
    school.cafetaria=schoolData.cycles[index].canteen.cafeteria.value;
    school.externat=schoolData.cycles[index].externat.externat.value;
    school.externatMixte=schoolData.cycles[index].externat['demi-pension_mixte'].value;
    school.externatBoys=schoolData.cycles[index].externat['demi-pension_boys'].value;
    school.externatGirls=schoolData.cycles[index].externat['demi-pension_girls'].value;
    school.autoContact='true';
    school.autoWebsite=schoolData.cycles[index].autorisations.autorization1desc;
    school.autoWeb1=schoolData.cycles[index].autorisations.autorization1;
    // school.autoWeb2=schoolData.cycles[index].autorisations.
    school.mailingList=schoolData.cycles[index].autorisations.mailing.value;
    school.statMailing=schoolData.cycles[index].autorisations.ficheLink;
    school.statImmediat=schoolData.cycles[index].autorisations.immediate;
    school.statQuotidien=schoolData.cycles[index].autorisations.daily;
    school.statHebdo=schoolData.cycles[index].autorisations.weekly;
    school.statMensuel=schoolData.cycles[index].autorisations.monthly;
    school.cycleName=schoolData.cycles[index].cycle.nom;
    school.postalCode=schoolData.cycles[index].cycle.nom;
    // console.log("test1")
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
