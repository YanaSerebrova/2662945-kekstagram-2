
function checkStringLength(string, maxLength) {
  const stringLength = string.length;
  const check = stringLength <= maxLength;
  return check;
}

const checkString = (string, maxLength) => string.length <= maxLength;

console.log(checkStringLength('проверяемая строка', 8));
console.log(checkStringLength('проверяемая строка', 30));
console.log(checkStringLength('проверяемая строка', 15));

function checkPalindrome(string) {
  const neutralString = string
    .toLowerCase()
    .replaceAll(' ', '');
  let reversedString = '';
  for (let i = neutralString.length - 1; i >= 0; i--) {
    reversedString += neutralString[i];
  }
  return neutralString === reversedString;
}

const isPalindrome = (text) => {
  const normalized = text.toUpperCase().replaceAll(' ', '');
  let reversed = '';
  for (let i = normalized.length - 1; i <= 0; i = i - 1) {
    reversed += normalized[i];
  }
  return normalized === reversed;
};

const isPalindromeByArray = (line) => {
  const normalized = line.toLowerCase().replaceAll(' ', '')
  const reversed = normalized.split('').reverse().join('');
  return normalized === reversed;
}

console.log(checkPalindrome('Довод'));
console.log(checkPalindrome('А роза упала на лапу Азора'));
console.log(checkPalindrome('Гроза'));

const getNumbers = (text) => {
  let allNumbers = '';

  for (let j = 0; j < text.length; j++) {
    const current = parseInt(text[j], 10);
    if (!isNaN(current)) {
      allNumbers += current;
    }
  }
  return parseInt(allNumbers);
};

console.log(getNumbers('2023 год'));            // 2023
console.log(getNumbers('ECMAScript 2022'));     // 2022
console.log(getNumbers('1 кефир, 0.5 батона')); // 105
console.log(getNumbers('агент 007'));           // 7
console.log(getNumbers('а я томат'));           // NaN



const toMinutes = (time) => {
const [hours, minutes] = time.split(":");
return Number(hours) * 60 + Number(minutes);
}
const checkMeetingTime = (workStart, workEnd, meetingStart, meetingDuration) => {

const workStartMin = toMinutes(workStart);
const workEndMin = toMinutes(workEnd);
const meetingStartMin = toMinutes(meetingStart);
const meetingEndMin = meetingStartMin + meetingDuration;

return meetingStartMin >= workStartMin && meetingEndMin <= workEndMin;
}
console.log(checkMeetingTime('08:00', '17:30', '14:00', 90));
console.log(checkMeetingTime('8:0', '10:0', '8:0', 120));
console.log(checkMeetingTime('08:00', '14:30', '14:00', 90));
console.log(checkMeetingTime('14:00', '17:30', '08:0', 90));
console.log(checkMeetingTime('8:00', '17:30', '08:00', 900));

const flatNumber = 35;
const flatsPerFloor = 4;
const floorNumber = 5;

const flatsPerEntrance = flatsPerFloor * floorNumber;
const entrance = Math.ceil(flatNumber / flatsPerEntrance);
const flatsInEntrance = ((flatNumber - 1) % flatsPerEntrance) + 1;
let floor;
if (flatsInEntrance <= flatsPerFloor) {
floor = 1;
} else if (flatsInEntrance <= flatsPerFloor * 2) {
floor = 2;
} else if (flatsInEntrance <= flatsPerFloor * 3) {
floor = 3;
} else if (flatsInEntrance <= flatsPerFloor * 4) {
  floor = 4;
} else {
  floor = 5;
};
console.log(`Подъезд ${entrance}, этаж ${floor}`);
