function reverseString(str) {
  let listOfChars = str.split("");
  let reverseChars = listOfChars.reverse();
  let reversedStr = reverseChars.join("");

  return reversedStr;
}

function isPalindrome(str) {
  let reverse = reverseString(str);

  return str === reverse;
}

function convertDateToString(date) {
  var dateStr = { day: "", month: "", year: "" };

  //day
  if (date.day < 10) {
    dateStr.day = "0" + date.day;
  } else {
    dateStr.day = date.day.toString();
  }

  //Month
  if (date.month < 10) {
    dateStr.month = "0" + date.month;
  } else {
    dateStr.month = date.month.toString();
  }

  //Year
  dateStr.year = date.year.toString();

  return dateStr;
  //
}

function getAllDateFormats(date) {
  var dateStr = convertDateToString(date);

  var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllDateFormats(date) {
  var listOfPalindromes = getAllDateFormats(date);

  var flag = false;

  for (var i = 0; i < listOfPalindromes.length; i++) {
    if (isPalindrome(listOfPalindromes[i])) {
      flag = true;
      break;
    }
  }

  return flag;
}

function isLeapYear(year) {
  if (year % 400 === 0) {
    return true;
  }
  if (year % 100 === 0) {
    return true;
  }
  if (year % 4 === 0) {
    return true;
  }
  return false;
}
//gets the next date if date is  8 Aug it will Give 9 Aug
function getNextDate(date) {
  var day = date.day + 1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; //[0 to 11]

  if (month === 2) {
    //check for Feb Month
    if (isLeapYear(year)) {
      // the year is 2020 true
      //if true then check for Leap Year
      if (day > 29) {
        //if day>29 false
        day = 1;
        month++;
      }
    } else {
      // if not a leap year which is 28days then we increment month
      if (day > 28) {
        day = 1;
        month++;
      }
    }
  } else {
    //Check if the day exceds the max days in month
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }
  // if the month is dec then make it to Jan and inc the year
  if (month > 12) {
    month = 1;
    year++;
  }

  return {
    day: day,
    month: month,
    year: year,
  };
}

// get the next Palindrome date
function getNextPalindromeDate(date) {
  var ctr = 0;
  var nextDate = getNextDate(date);

  while (1) {
    ctr++;
    var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
    if (isPalindrome) {
      break;
    }
    nextDate = getNextDate(nextDate);
  }

  return [ctr, nextDate];
}

const inputDate = document.querySelector("#input-date");
const showBtn = document.querySelector("#show-btn");
const outputDiv = document.querySelector(".output-div");

function clickHandler() {
  var bdayStr = inputDate.value;
  if (bdayStr !== "") {
    var listOfDate = bdayStr.split("-");
    var date = {
      day: Number(listOfDate[2]),
      month: Number(listOfDate[1]),
      year: Number(listOfDate[0]),
    };
    var isPal = checkPalindromeForAllDateFormats(date);
    console.log(isPal);

    if (isPal) {
      outputDiv.innerText = `Yay! Your Birthday is Palindrome`;
    } else {
      var [ctr, nextDate] = getNextPalindromeDate(date);
      outputDiv.innerText = `The Next Palindrome is ${nextDate.day}-${nextDate.month}-${nextDate.year} and you missed it by ${ctr} days `;
    }
  } else {
    outputDiv.innerText = "Please select the Date!";
  }
}

showBtn.addEventListener("click", clickHandler);
// var date = {
//   day: 26,
//   month: 8,
//   year: 2021,
// };

// console.log(getNextDate(date)); //15 Aug 2021 Will give 16 Aug 2021
//console.log(getNextDate(date)); // 28 Feb 2020 It is a leap Year => 29 Feb 2020
//console.log(getNextDate(date)); // 31 Dec 2020 now the month is dec it will have to increment to make Jan and inc year => 1 Jan 2021
//console.log(getNextPalindromeDate(date));
// console.log(checkPalindromeForAllDateFormats(date));
