import { Injectable } from '@angular/core';

@Injectable()
export class HelperService {
  // very very very bad bad bad bad
  classEcoleList= {
    infant: ['Petite section (PS)', 'Moyenne section (MS)', 'Grande Section (GS)'],
    primary: ['Cours préparatoire (CP)', 'Cours élémentaire 1er année(CE1)', 'Cours élémentaire 2è année (CE2)',
              'Cours Moyen 1er année(CM1)', 'Cours Moyen 2è année(CM2)'],
    college: ['6ème', '5ème', '4ème', '3ème'],
    sollegeSpeA : ['Quatrième d\'aide et de soutien', 'Troisième d\'insertion', 'Troisième découverte professionnelle - DP6 (module 6 heures)',
    '3ème préparatoire aux formations professionnels - Troisième prépa pro (ex DP6)', 'DIMA Dispositif d\'initiation aux métiers en alternance (en collège)',
    'SEGPA 6è-5è section d\'enseignement général et professionnel adapté', 'SEGPA 4è-3è section d\'enseignement général et professionnel adapté',
    'ULIS unités localisées pour l\'inclusion solaire (ex UPI)'],
    sollegeSpeB: ['Cursus non francophone (GB-US)', 'Ecole pratiquant la pédagogie Montessori', 'Enseignement à distance'],
    seconde: ['2nde générale et technologique', '2nde de probation (ou méthodologique)'],
    premiere: ['1ere ES - Economique et Sociale', '1ere L - Littéraire', '1ere S - Scientifique'],
    terminal: ['Tle ES - Economique et Sociale', 'Tle L - Littéraire', 'Tle S - Scientifique'],
    international: ['Cursus International', 'Cursus Bac. International', 'Cursus non francophone (GB-US)'],
    strh: ['2nde spécifique STHR', '1ere d’adaptation STHR', '1ere STHR', 'Terminale STHR'],
    st2s: ['2nde générale et technologique', '1ere d’adaptation ST2S', '1ere ST2S', 'Terminale STIS'],
    std2a: ['2nde générale et technologique', '1ère STI2A', 'Terminale STI2A'],
    sti2d: ['2nde générale et technologique', '1ère STI2D', 'Terminale ST2D – Architecture et Construction',
    'Terminale STI2D – Energie et Environnement', 'Terminale STI2D – Innovation Technologique et Eco-conception',
    'Terminale STI2D – Systèmes D’Information Numérique'],
    stmg: ['2nde générale et technologique', '1ère d’adaptation STMG', '1ère STMG', 'Terminale STMG – Gestion et Finance',
      'erminale STMG – Mercatique', 'Terminale STMG – Ressources Humaines et Communication', 'Terminale STMG – Systèmes D’Information et de Gestion'],
    stl: ['2nde générale et technologique', '1ère d’adaptation STL', '1ère STL', 'Terminale STL – Biotechnologies',
    'erminale STL – Sciences Physiques et Chimiques en Laboratoire'],
    stav: ['2nde générale et technologique', '1ère d\'adaptation STAV', '1ère STAV', 'Terminale STAV'],
    tmd: ['2nde spécifique TMD', '1ère d’adaptation TMD', '1ère TMD', 'Terminale TMD - Danse', 'Terminale TMD - Musique']
  }
  classEcoleListToSendToApi= {
    infant: ['ps', 'ms', 'gs'],
    primary: ['cp', 'ce1', 'ce2', 'cm1', 'cm2'],
    college: ['6e', 'cinquieme', 'quatrieme', 'troisieme'],
    seconde: ['seconde_techno', 'seconde_probation'],
    premiere: ['premiere_es', 'premiere_l', 'premiere_s'],
    terminal: ['terminale_es', 'terminale_l', 'terminale_s'],
    international: ['CI', 'BAC-I', 'cursus_non_francophone'],
    strh: ['seconde_sthr', 'premiere_sthr', 'premiere_sthr', 'terminale_sthr'],
    st2s: ['seconde_techno', 'premiere_sti2s', 'premiere_st2s', 'terminale_st2s'],
    std2a: ['seconde_techno', 'premiere_std2a', 'terminale_std2a'],
    sti2d: ['seconde_techno', 'premiere_sti2d', 'terminale_sti2d', 'terminale_sti2d',
      'terminale_sti2d', 'terminale_sti2d'],
    stmg: ['seconde_techno', 'premiere_stmg', 'premiere_stmg', 'terminale_stmg', 'terminale_stmg', 'terminale_stmg', 'terminale_stmg'],
    stl: ['seconde_techno', 'premiere_stl', 'premiere_stl', 'terminale_stl', 'terminale_stl'],
    stav: ['seconde_techno', 'premiere_stav', 'premiere_stav', 'terminale_stav'],
    tmd: ['2ndeTMD', 'premiere_tmd', 'premiere_tmd', 'terminale_tmd', 'terminale_tmd']
  }

  // good
  listSchool = {
    infant_primary: [
      {
        'tag': 'infant',
        'name': 'Petite section (PS)',
        'valueAPI': 'ps'
      },
      {
        'tag': 'infant',
        'name': 'Moyenne section (MS)',
        'valueAPI': 'ms'
      },
      {
        'tag': 'infant',
        'name': 'Grande Section (GS)',
        'valueAPI': 'gs'
      },
      {
        'tag': 'primary',
        'name': 'Cours préparatoire (CP)',
        'valueAPI': 'cp'
      },
      {
        'tag': 'primary',
        'name': 'Cours élémentaire 1er année(CE1)',
        'valueAPI': 'ce1'
      },
      {
        'tag': 'primary',
        'name': 'Cours élémentaire 2è année (CE2)',
        'valueAPI': 'ce2'
      },
      {
        'tag': 'primary',
        'name': 'Cours Moyen 1er année(CM1)',
        'valueAPI': 'cm1'
      },
      {
        'tag': 'primary',
        'name': 'Cours Moyen 2è année(CM2)',
        'valueAPI': 'cm2'
      }
    ],
    secondary_school: [
      {
        'tag': null,
        'name': '6ème',
        'valueAPI': '6e'
      },
      {
        'tag': null,
        'name': '5ème',
        'valueAPI': 'cinquieme'
      },
      {
        'tag': null,
        'name': '4ème',
        'valueAPI': 'quatrieme'
      },
      {
        'tag': null,
        'name': '3ème',
        'valueAPI': 'troisieme'
      },
      {
        'tag': 'ccollegeSpeA',
        'name': 'Quatrième d\'aide et de soutien',
        'valueAPI': null
      },
      {
        'tag': 'ccollegeSpeA',
        'name': 'Troisième d\'insertion',
        'valueAPI': null
      },
      {
        'tag': 'ccollegeSpeA',
        'name': 'Troisième découverte professionnelle - DP6 (module 6 heures)',
        'valueAPI': null
      },
      {
        'tag': 'ccollegeSpeA',
        'name': '3ème préparatoire aux formations professionnels - Troisième prépa pro (ex DP6)',
        'valueAPI': null
      },
      {
        'tag': 'ccollegeSpeA',
        'name': 'DIMA Dispositif d\'initiation aux métiers en alternance (en collège)',
        'valueAPI': null
      },
      {
        'tag': 'ccollegeSpeA',
        'name': 'SEGPA 6è-5è section d\'enseignement général et professionnel adapté',
        'valueAPI': null
      },
      {
        'tag': 'ccollegeSpeA',
        'name': 'SEGPA 4è-3è section d\'enseignement général et professionnel adapté',
        'valueAPI': null
      },
      {
        'tag': 'ccollegeSpeA',
        'name': 'ULIS unités localisées pour l\'inclusion solaire (ex UPI)',
        'valueAPI': null
      },
      {
        'tag': 'ccollegeSpeB',
        'name': 'Cursus non francophone (GB-US)',
        'valueAPI': null
      },
      {
        'tag': 'ccollegeSpeB',
        'name': 'Ecole pratiquant la pédagogie Montessori',
        'valueAPI': null
      },
      {
        'tag': 'ccollegeSpeB',
        'name': 'Enseignement à distance',
        'valueAPI': null
      }
    ],
    college: [
      {
        'tag': null,
        'name': '2nde générale et technologique',
        'valueAPI': 'seconde_techno'
      },
      {
        'tag': null,
        'name': '2nde de probation (ou méthodologique)',
        'valueAPI': 'seconde_probation'
      },
      {
        'tag': null,
        'name': '1ere ES - Economique et Sociale',
        'valueAPI': 'premiere_es'
      },
      {
        'tag': null,
        'name': '1ere L - Littéraire',
        'valueAPI': 'premiere_l'
      },
      {
        'tag': null,
        'name': '1ere S - Scientifique',
        'valueAPI': 'premiere_s'
      },
      {
        'tag': null,
        'name': 'Tle ES - Economique et Sociale',
        'valueAPI': 'terminale_es'
      },
      {
        'tag': null,
        'name': 'Tle L - Littéraire',
        'valueAPI': 'terminale_l'
      },
      {
        'tag': null,
        'name': 'Tle S - Scientifique',
        'valueAPI': 'terminale_s'
      },
      {
        'tag': 'international',
        'name': 'Cursus International',
        'valueAPI': 'CI'
      },
      {
        'tag': 'international',
        'name': 'Cursus Bac. International',
        'valueAPI': 'BAC-I'
      },
      {
        'tag': 'international',
        'name': 'Cursus non francophone (GB-US)',
        'valueAPI': 'cursus_non_francophone'
      },
      {
        'tag': 'strh',
        'name': '2nde spécifique STHR',
        'valueAPI': 'seconde_sthr'
      },
      {
        'tag': 'strh',
        'name': '1ere d’adaptation STHR',
        'valueAPI': 'premiere_sthr'
      },
      {
        'tag': 'strh',
        'name': '1ere STHR',
        'valueAPI': 'premiere_sthr'
      },
      {
        'tag': 'strh',
        'name': 'Terminale STHR',
        'valueAPI': 'terminale_sthr'
      },
      {
        'tag': 'st2s',
        'name': '2nde générale et technologique',
        'value': 'seconde_techno'
      },
      {
        'tag': 'st2s',
        'name': '1ere d’adaptation ST2S',
        'valueAPI': 'premiere_st2s'
      },
      {
        'tag': 'st2s',
        'name': '1ere ST2S',
        'valueAPI': 'premiere_st2s'
      },
      {
        'tag': 'st2s',
        'name': 'Terminale ST2S',
        'valueAPI': 'terminale_st2s'
      },
      {
        'tag': 'std2a',
        'name': '2nde générale et technologique',
        'valueAPI': 'seconde_techno'
      },
      {
        'tag': 'std2a',
        'name': '1ère STD2A',
        'valueAPI': 'premiere_std2a'
      },
      {
        'tag': 'std2a',
        'name': 'Terminale STD2A',
        'valueAPI': 'terminale_std2a'
      },
      {
        'tag': 'sti2d',
        'name': '2nde générale et technologique',
        'valueAPI': 'seconde_techno'
      },
      {
        'tag': 'sti2d',
        'name': '1ère STI2D',
        'valueAPI': 'premiere_sti2d'
      },
      {
        'tag': 'sti2d',
        'name': 'Terminale STI2D – Architecture et Construction',
        'valueAPI': 'terminale_sti2d'
      },
      {
        'tag': 'sti2d',
        'name': 'Terminale STI2D – Energie et Environnement',
        'valueAPI': 'terminale_sti2d'
      },
      {
        'tag': 'sti2d',
        'name': 'Terminale STI2D – Innovation Technologique et Eco-conception',
        'valueAPI': 'terminale_sti2d'
      },
      {
        'tag': 'sti2d',
        'name': 'Terminale STI2D – Systèmes D’Information Numérique',
        'valueAPI': 'terminale_sti2d'
      },
      {
        'tag': 'stmg',
        'name': '2nde générale et technologique',
        'valueAPI': 'seconde_techno'
      },
      {
        'tag': 'stmg',
        'name': '1ère d’adaptation STMG',
        'value': 'premiere_stmg'
      },
      {
        'tag': 'stmg',
        'name': '1ère STMG',
        'valueAPI': 'premiere_stmg'
      },
      {
        'tag': 'stmg',
        'name': 'Terminale STMG – Gestion et Finance',
        'valueAPI': 'terminale_stmg'
      },
      {
        'tag': 'stmg',
        'name': 'Terminale STMG – Mercatique',
        'valueAPI': 'terminale_stmg'
      },
      {
        'tag': 'stmg',
        'name': 'Terminale STMG – Ressources Humaines et Communication',
        'valueAPI': 'terminale_stmg'
      },
      {
        'tag': 'stmg',
        'name': 'Terminale STMG – Systèmes D’Information et de Gestion',
        'valueAPI': 'terminale_stmg'
      },
      {
        'tag': 'stl',
        'name': '2nde générale et technologique',
        'valueAPI': 'seconde_techno'
      },
      {
        'tag': 'stl',
        'name': '1ère d’adaptation STL',
        'valueAPI': 'premiere_stl'
      },
      {
        'tag': 'stl',
        'name': '1ère STL',
        'valueAPI': 'premiere_stl'
      },
      {
        'tag': 'stl',
        'name': 'Terminale STL – Biotechnologies',
        'valueAPI': 'terminale_stl'
      },
      {
        'tag': 'stl',
        'name': 'Terminale STL – Sciences Physiques et Chimiques en Laboratoire',
        'valueAPI': 'terminale_stl'
      },
      {
        'tag': 'stav',
        'name': '2nde générale et technologique',
        'valueAPI': 'seconde_techno'
      },
      {
        'tag': 'stav',
        'name': '1ère d’adaptation STAV',
        'valueAPI': 'premiere_stav'
      },
      {
        'tag': 'stav',
        'name': '1ère STAV',
        'valueAPI': 'premiere_stav'
      },
      {
        'tag': 'stav',
        'name': 'Terminale STAV',
        'valueAPI': 'terminale_stav'
      },
      {
        'tag': 'tmd',
        'name': '2nde spécifique TMD',
        'valueAPI': '2ndeTMD'
      },
      {
        'tag': 'tmd',
        'name': '1ère d\'daptation TMD',
        'valueAPI': 'premiere_tmd'
      },
      {
        'tag': 'tmd',
        'name': '1ère TMD',
        'valueAPI': 'premiere_tmd'
      },
      {
        'tag': 'tmd',
        'name': 'Terminale TMD - Danse',
        'valueAPI': 'terminale_tmd'
      },
      {
        'tag': 'tmd',
        'name': 'Terminale TMD - Musique',
        'valueAPI': 'terminale_tmd'
      }
    ]
  };

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

  getAllList(){
    return this.listSchool;
  }

}
