
const Ordinals = ["first", "second", "third"];

const Glosses = {
  SBJ: "subject",
  TAM: "tense",
  OBJ: "object",

  //1, 2, 3 are translated are first person, second person, third person
  SG: "singular",
  PL: "plural",
  POS: "positive",
  NEG: "negative",

  PRS: "present",
  PST: "past",
  FUT: "future",
  PRF: "perfect"
}

const Subjects = {
  s1SG_POS: "ni",
  s2SG_POS: "u",
  s3SG_POS: "a",
  s1PL_POS: "tu",
  s2PL_POS: "m",
  s3PL_POS: "wa"
}

const Tenses = {
  tPRS: "na",
  tPST: "li",
  tPRS_PRF: "me",
  tFUT: "ta"
}

const Objects = {
  o1SG: "ni",
  o2SG: "ku",
  //Only one entered for now
  o3SG: "m",
  o1PL: "tu",
  o23PL: "wa",
}

const MorphemeTypes = {
  SBJ: Subjects,
  TAM: Tenses,
  OBJ: Objects
}

function inputText() {
  let input = document.getElementById("input").value;

  //End form is going to look something like:
  //SBJ: s1SG_POS
  let verb = {};

  //Slot is SBJ, TAM, OBJ
  //Gloss is gonna look like s1PL_POS
  for(let slot of Object.keys(MorphemeTypes) ){
    let gloss = findMorpheme(MorphemeTypes[slot], input);
    verb[slot] = gloss;
    if(gloss){
      input = input.substring(MorphemeTypes[slot][gloss].length);
    }
    document.getElementById(slot).innerHTML = print(verb, slot);
  }

  document.getElementById("ROOT").innerHTML = "You're left with the verb root: " + input;


  //No way to deal with extensions yet
  //Or with m/mw objects
  //Or with negation
  //Or with negation and tense changes
}

//Returns what will be printed out for a given verb and slot
function print(verb, slot) {
  if(verb[slot] ) {
    let runningString = "The " + Glosses[slot] + " is ";
    let tempSlot = verb[slot].substring(1); //verb[slot] = gloss
    if (Number.parseInt(tempSlot.charAt(0) ) ) {
      runningString = runningString + Ordinals[Number.parseInt(tempSlot.charAt(0) ) - 1] + " person ";
      tempSlot = tempSlot.substring(1);
    }
    tempSlot.split("_").forEach(item => runningString = runningString + Glosses[item] + " ");
    return runningString + "(" + MorphemeTypes[slot][verb[slot]] + ")";
  } else {
    return "No " + Glosses[slot] + " found";
  }

}

//Returns the key, so something like s1SG_POS
function findMorpheme(morphemeType, input) {
  for(let key of Object.keys(morphemeType) ){
    if(morphemeType[key] === input.substring(0, morphemeType[key].length) ){
      return key;
    }
  }
  return null;
}







