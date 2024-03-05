var minimumLength = function (s) {
  let left = 0;
  let right = s.length - 1;
  console.log("===>", left < right && s[left] === s[right]);

  while (left < right && s[left] === s[right]) {
    let char = s[left];
    console.log("===>", char);

    while (left <= right && s[left] === char) {
      left++;
    }
    while (right >= left && s[right] === char) {
      right--;
    }
  }
  console.log(left, right);

  return right - left + 1;
};
/*
left = 0, right = 7 (cabaabac) => Không giống nhau, bắt đầu xử lý từ hai đầu
left = 1, right = 6 (abaaba)   => 'c' không giống nhau, tiếp tục xử lý từ hai đầu
left = 2, right = 5 (baab)     => 'a' giống nhau, tiếp tục xử lý từ hai đầu
left = 4, right = 4 (a)        => Chỉ còn một ký tự, dừng lại

*/
const a = "cabaabac";
console.log(minimumLength(a));
