import { Injectable } from '@angular/core';

@Injectable()
export class HelperService {

  classEcoleList={
    infant:["Petite section (PS)", "Moyenne section (MS)", "Grande Section (GS)"],
    primary:["Cours préparatoire (CP)", "Cours élémentaire 1er année(CE1)", "Cours élémentaire 2è année (CE2)",
              "Cours Moyen 1er année(CM1)", "Cours Moyen 2è année(CM2)"],
    college:["6ème", "5ème", "4ème", "3ème"],
    seconde:["2nde générale et technologique", "2nde de probation (ou méthodologique)"],
    premiere:["1ere ES - Economique et Sociale", "1ere L - Littéraire", "1ere S - Scientifique"],
    terminal:["Tle ES - Economique et Sociale", "Tle L - Littéraire", "Tle S - Scientifique"],
    international:["Cursus International", "Cursus Bac. International", "Cursus non francophone (GB-US)"],
    strh:["2nde spécifique STHR", "1ere d’adaptation STHR", "1ere STHR", "Terminale STHR"],
    st2s:["2nde générale et technologique", "1ere d’adaptation ST2S", "1ere ST2S", "Terminale STIS"],
    std2a:["2nde générale et technologique", "1ère STI2A", "Terminale STI2A"],
    sti2d:["2nde générale et technologique", "1ère STI2D", "Terminale ST2D – Architecture et Construction",
    "Terminale STI2D – Energie et Environnement", "Terminale STI2D – Innovation Technologique et Eco-conception",
    "Terminale STI2D – Systèmes D’Information Numérique"],
    stmg:["2nde générale et technologique", "1ère d’adaptation STMG", "1ère STMG", "Terminale STMG – Gestion et Finance",
      "erminale STMG – Mercatique", "Terminale STMG – Ressources Humaines et Communication", "Terminale STMG – Systèmes D’Information et de Gestion"],
    stl:["2nde générale et technologique", "1ère d’adaptation STL", "1ère STL", "Terminale STL – Biotechnologies",
    "erminale STL – Sciences Physiques et Chimiques en Laboratoire"],
    stav:["2nde générale et technologique", "1ère d’adaptation STAV", "1ère STAV", "Terminale STAV"],
    tmd:["2nde spécifique TMD", "1ère d’adaptation TMD", "1ère TMD", "Terminale TMD - Danse", "Terminale TMD - Musique"]
  }
  classEcoleListToSendToApi={
    infant:["ps", "ms", "gs"],
    primary:["cp", "ce1", "ce2", "cm1", "cm2"],
    college:["6e", "cinquieme", "quatrieme", "troisieme"],
    seconde:["seconde_techno", "seconde_probation"],
    premiere:["premiere_es", "premiere_l", "premiere_s"],
    terminal:["terminale_es", "terminale_l", "terminale_s"],
    international:["CI", "BAC-I", "cursus_non_francophone"],
    strh:["seconde_sthr", "premiere_sthr", "premiere_sthr", "terminale_sthr"],
    st2s:["seconde_techno", "premiere_sti2s", "premiere_st2s", "terminale_st2s"],
    std2a:["seconde_techno", "premiere_std2a", "terminale_std2a"],
    sti2d:["seconde_techno", "premiere_sti2d", "terminale_sti2d", "terminale_sti2d",
      "terminale_sti2d", "terminale_sti2d"],
    stmg:["seconde_techno", "premiere_stmg", "premiere_stmg", "terminale_stmg", "terminale_stmg", "terminale_stmg", "terminale_stmg"],
    stl:["seconde_techno", "premiere_stl", "premiere_stl", "terminale_stl", "terminale_stl"],
    stav:["seconde_techno", "premiere_stav", "premiere_stav", "terminale_stav"],
    tmd:["2ndeTMD", "premiere_tmd", "premiere_tmd", "terminale_tmd", "terminale_tmd"]
  }

  constructor() { }

  detectmob() {
    return !!(navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i));
  }

  getClassEcoleList(){
    return this.classEcoleList;
  }

  getclassEcoleListToSendToApi(){
    return this.classEcoleListToSendToApi;
  }

}
