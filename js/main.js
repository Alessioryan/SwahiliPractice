
const Subjects = {
  s1SG_POS: "ni",
  s2SG_POS: "u",
  s3SG_POS: "a",
  s1PL_POS: "tu",
  s2PL_POS: "m",
  s3PL_POS: "wa"
}
const Tenses = {
  tSIMP_PRES: "na",
  tSIMP_PAST: "li",
  tPRES_PERF: "me",
  tFUT: "ta"
}

const Objects = {
  s1SG_POS: "ni",
  s2SG_POS: "ku",
  //Only one entered for now
  s3SG_POS: "m",
  s1PL_POS: "tu",
  s23PL_POS: "wa",
}

const MorphemeTypes = {
  s: Subjects,
  t: Tenses,
  o: Objects
}

function inputText() {
  let input = document.getElementById("Verb").value;

  let verb = {};


  for(let initial of Object.keys(MorphemeTypes) ){
    let found = findMorpheme(MorphemeTypes[initial], input);
    if(found){
      verb[initial] = "Your subject is " + found;
      input = input.substring(found.length);
    } else {
      verb[initial] = "No subject found";
    }
    document.getElementById(initial).innerHTML = verb[initial];
  }


  //document.getElementById("subj").innerHTML = "Subj is: " + findMorpheme(input);

}

function findMorpheme(morphemeType, input){

  for(let key of Object.keys(morphemeType) ){
    const morpheme = morphemeType[key];
    if(morpheme === input.substring(0, morpheme.length) ){
      return morpheme;
    }
  }


  /* switch (morpheme){
    case Subjects:
      alert("hello");
          break;
    case Tenses:
      alert("hi");
          break;
    default:
      alert("default " + morpheme);
  } */

}


/*
function findSubj(verb) {
  for(let subject of Object.keys(Subjects) ){
    if(Subjects[subject] === verb.substring(0, Subjects[subject].length) ){
      return Subjects[subject];
    }
  }
  return "not found... please don't mess with me. My time is valuable";
} */






