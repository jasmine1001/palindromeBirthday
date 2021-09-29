function reverseStr(str) {
    var listOfChar = str.split('');
    var reverseList = listOfChar.reverse();

    var reversedStr = reverseList.join('');

    return reversedStr;
}

console.log(reverseStr('hello'));

function isPalindrome(str) {
    var reverse = reverseStr(str);

    return str === reverse;

}

function convertDateToString(date) {
    var dateStr = { day: '', month: '', year: '' };

    if (date.day < 10) {
        dateStr.day = '0' + date.day;
    }
    else {
        dateStr.day = date.day.toString();
    }

    if (date.month < 10) {
        dateStr.month = '0' + date.month;
    }
    else {
        dateStr.month = date.month.toString();
    }
    dateStr.year = date.year.toString();
    return dateStr;

}

var date = {
    day: 8,
    month: 8,
    year: 2021
};

console.log(convertDateToString(date));

function getAllDateFormats(date) {
    var dateStr = convertDateToString(date);

    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, yymmdd, ddmmyy, mmddyy];
}

function checkPalindromeForAllDateFormats(date) {
    var listOfPalindrome = getAllDateFormats(date);
    var flag = false;

    for (var i = 0; i < listOfPalindrome.length; i++) {
        if (isPalindrome(listOfPalindrome[i])) {
            flag = true;
            break;
        }
    }
    return flag;
}

function leapYear(year) {
    if (year % 400 === 0) {
        return true;
    }
    if (year % 100 === 0) {
        return false;
    }
    if (year % 4 === 0) {
        return true;
    }
    return false;
}

function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 2) {
        if (leapYear(year)) {
            if (day > 29) {
                day = 1;
                month++;
            } else {
                if (day > 28) {
                    day = 1;
                    month++;
                }
            }
        }
    } else {
        if (day > daysInMonth[month - 1]) {
            day = 1;
            month++;
        }
    }

    if(month>12){
        month =1;
        year++;
    }

    return{
        day:day,
        month:month,
        year:year
    }
}

function getNextPalindrome(date) {
var count= 0;
var nextDate = getNextDate(date);

while(1){
    count ++;
    var isPalin = checkPalindromeForAllDateFormats(nextDate);
    if(isPalin){
break;
    }
    nextDate= getNextDate(nextDate);
}
return [count, nextDate]
}


// 


// var date = {
//     day: 31,
//     month: 12,
//     year: 2020
// };

// console.log(getAllDateFormats(date));
// console.log(checkPalindromeForAllDateFormats(date));

console.log(getNextDate(date));
console.log(getNextPalindrome(date))



var dateInputRef = document.querySelector('#bday-input');
var showBtn = document.querySelector('#show');
var resultRef = document.querySelector('#result')

function clickHandler(e){
var bdyStr = dateInputRef.value;

if (bdyStr !==''){
    var listOfDate = bdyStr.split('-');

    var date = {
        day :Number( listOfDate[2]),
        month :Number(listOfDate[1]),
        year :Number(listOfDate[0])
    };
var isPalindrome = checkPalindromeForAllDateFormats(date);
if(isPalindrome){
resultRef.innerText = "Yay ! Your Birthday is Palindrome😀";
} else{
 var [count, nextDate] = getNextPalindrome(date);

    resultRef.innerText = `The next Palindrome date is ${nextDate.day}-${nextDate.month}- ${nextDate.year}, you missed it by ${count} days! `;
}
console.log(isPalindrome);
}
}



showBtn.addEventListener("click" , clickHandler);