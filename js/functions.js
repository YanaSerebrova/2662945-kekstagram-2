function checkStringLength(string, maxLength) {
  let stringLength = string.length;
  let check = stringLength <= maxLength;
  return check;
}
console.log(checkStringLength('проверяемая строка', 8));
console.log(checkStringLength('проверяемая строка', 30));
console.log(checkStringLength('проверяемая строка', 15));

function checkPalindrome (string) {
  let neutralString = string
  .toLowerCase()
  .replaceAll(' ', '');
  let reversedString = '';
  for (let i = neutralString.length - 1; i >= 0; i--) {
    reversedString += neutralString[i];
  }
  return neutralString == reversedString;
}

console.log(checkPalindrome('Довод'));
console.log(checkPalindrome('А роза упала на лапу Азора'));
console.log(checkPalindrome('Гроза'));
