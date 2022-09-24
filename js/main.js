
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

  //At this point, input is just the root
  document.getElementById("split").innerHTML = splitVerb(verb, input);

  //No way to deal with extensions yet
  //Or with m/mw objects
  //Or with negation
  //Or with negation and tense changes
}


//Verb is the verb, input is (at this point) the root
function splitVerb(verb, input) {
  let runningString = "If I were you, I would split up the verb as follows: ";
  for(let slot of Object.keys(verb) ){
    if(verb[slot] ){
      runningString = runningString + MorphemeTypes[slot][verb[slot] ] + "-";
    } else {
      runningString = runningString + "\u2205-";
    }
  }
  return runningString + input;
}


//Returns what will be printed out for a given verb and slot
function print(verb, slot) {
  if(verb[slot] ) {
    let runningString = "The " + Glosses[slot] + " is ";
    //Change this as needed
    runningString = runningString + printWordedGloss(verb, slot);
    runningString = runningString + printSwahiliMorpheme(verb, slot);
    return runningString;
  } else {
    return "No " + Glosses[slot] + " found";
  }
}

//Something like: The subject is first person singular positive
function printWordedGloss(verb, slot) {
  let runningString = "";
  let tempSlot = verb[slot].substring(1); //verb[slot] = gloss
  if (Number.parseInt(tempSlot.charAt(0) ) ) {
    runningString = runningString + Ordinals[Number.parseInt(tempSlot.charAt(0) ) - 1] + " person ";
    tempSlot = tempSlot.substring(1);
  }
  tempSlot.split("_").forEach(item => runningString = runningString + Glosses[item] + " ");
  return runningString;
}

//Something like (ni)
function printSwahiliMorpheme(verb, slot) {
  return "(" + MorphemeTypes[slot][verb[slot]] + ")"
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







