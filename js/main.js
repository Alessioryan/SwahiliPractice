const Vowels = ["a","e","i","o","u"];
const Subjects = {
  s1SG_POS: "ni",
  s2SG_POS: "u",
  s3SG_POS: "a",
  s1PL_POS: "tu",
  s2PL_POS: "m",
  s3PL_POS: "wa"
}

function inputText() {
  let input = document.getElementById("Verb").value;

  document.getElementById("subj").innerHTML = findSubj(input);

}


function findSubj(verb) {
  for(let subject of Object.keys(Subjects) ){
    if(Subjects[subject] === verb.substring(0, Subjects[subject].length) ){
      return Subjects[subject];
    }
  }
  return "subject not found";
}





