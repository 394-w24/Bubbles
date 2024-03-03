import data from "../../data/symbol.json" assert { type: "json" };

function containsAnyNumberFrom17To25(arr) {
  // could use  17 <= x <= 25
  const numSet = new Set();
  for (let i = 17; i <= 25; i++) {
    numSet.add(i);
  }
  return arr.some((ele) => numSet.has(ele));
}

function check(lst1, lst2) {
  let washingSymbols = data.washing;
  let bleachingSymbols = data.bleaching;
  let dryingSymbols = data.drying;
  let ironingSymbols = data.ironing;
  let professionalCleaningSymbols = data.professionalCleaning;

  lst1 = lst1.map((element) => parseInt(element, 10));
  lst2 = lst2.map((element) => parseInt(element, 10));
  let instruction = {};
  instruction["washCapatible"] = true; // by default
  instruction["dryCapatible"] = true; // by default
  instruction["wash"] = "Machine wash on cold setting";
  instruction["dry"] = "Machine set on lower heat";

  if (
    (lst1.includes(10) && lst2.includes(10)) ||
    (lst1.includes(11) && lst2.includes(11))
  ) {
    if (lst1.includes(10)) {
      instruction["wash"] = washingSymbols[10].translation;
    }
    if (lst1.includes(11)) {
      instruction["wash"] = washingSymbols[11].translation;
    }
  }
  if (containsAnyNumberFrom17To25(lst1) && containsAnyNumberFrom17To25(lst2)) {
    // Can dry together
    instruction["dry"] = "You can dry these two together!";
  }
  if (
    (containsAnyNumberFrom17To25(lst1) && !containsAnyNumberFrom17To25(lst2)) ||
    (!containsAnyNumberFrom17To25(lst1) && containsAnyNumberFrom17To25(lst2))
  ) {
    // Can not dry together
    instruction["dryCapatible"] = false;
    instruction["dry"] = "You can not dry these two together!";
  }
  if (
    (lst1.includes(10) && !lst2.includes(10)) ||
    (lst2.includes(10) && !lst1.includes(10))
  ) {
    instruction["washCapatible"] = false;
    instruction["wash"] = "You can not wash these together";
  }
  if (
    (lst1.includes(11) && !lst2.includes(11)) ||
    (lst2.includes(11) && !lst1.includes(11))
  ) {
    instruction["washCapatible"] = false;
    instruction["wash"] = "You can not wash these together";
  }

  let minLst1 = Math.min(...lst1);
  let minLst2 = Math.min(...lst2);
  if (minLst1 > 9 || minLst2 > 9) {
    return instruction;
  } else {
    let max = Math.max(minLst1, minLst2);
    instruction["wash"] = washingSymbols[max].translation;
  }

  return instruction;
}

// console.log(check([8,17],[7,17]))

export default check;
