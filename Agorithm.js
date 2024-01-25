// File: algorithms.js

// 1. Tìm kiếm phần tử lớn nhất trong mảng
function findMax(arr) {
  console.log("1. Phần tử lớn nhất trong mảng:", Math.max(...arr));
}

// 2. Đảo ngược một chuỗi
function reverseString(str) {
  console.log("2. Chuỗi đảo ngược:", str.split('').reverse().join(''));
}

// 3. Tìm phần tử duy nhất trong mảng
function findUnique(arr) {
  let counts = {};
  for (let num of arr) {
    counts[num] = (counts[num] || 0) + 1;
  }
  const uniqueElement = Object.keys(counts).find(key => counts[key] === 1);
  console.log("3. Phần tử duy nhất trong mảng:", uniqueElement);
}

// 4. Sắp xếp mảng
function sortArray(arr) {
  //tăng dân a -b , giảm dần b - a
  const sortedArray = arr.slice().sort((a, b) => a - b);
  console.log("4. Mảng sau khi sắp xếp:", sortedArray);
}

// 5. Kiểm tra chuỗi đối xứng
function isPalindrome(str) {
  console.log("5. Chuỗi đối xứng:", str === str.split('').reverse().join(''));
}

// 6. Tìm số nguyên tố
function isPrime(num) {
  console.log("6. Số nguyên tố:", num > 1 && Array.from({ length: num - 1 }, (_, i) => i + 2).every(divisor => num % divisor !== 0));
}

// 7. Chuyển đổi giữa hai hệ số nhiều cơ số
function convertBase(num, base) {
  console.log(`7. ${num} trong hệ số ${base}:`, num.toString(base));
}

// 8. Tìm số lớn thứ k trong mảng (QuickSelect)
function findKthLargest(arr, k) {
  // Kiểm tra nếu k không hợp lệ
  if (k < 1 || k > arr.length) {
    console.log("8. Số lớn thứ k không hợp lệ");
    return;
  }

  // Hàm partition sử dụng thuật toán Lomuto để phân chia mảng
  const partition = (arr, low, high) => {
    const pivot = arr[high]; // Chọn phần tử pivot, ở đây chọn là phần tử cuối cùng của mảng
    let i = low;

    // Di chuyển phần tử lớn hơn pivot về đầu mảng
    for (let j = low; j < high; j++) {
      if (arr[j] >= pivot) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        i++;
      }
    }

    // Đặt pivot vào đúng vị trí
    [arr[i], arr[high]] = [arr[high], arr[i]];
    return i;
  };

  // Hàm quickSelect để tìm số lớn thứ k
  const quickSelect = (arr, low, high, k) => {
    if (low <= high) {
      const pivotIndex = partition(arr, low, high);
      console.log("pivotIndex", pivotIndex);

      // Nếu pivotIndex trùng với vị trí cần tìm, in ra kết quả
      if (pivotIndex === k - 1) {
        console.log(`8. Số lớn thứ ${k} trong mảng:`, arr[pivotIndex]);
      } else if (pivotIndex > k - 1) {
        // Nếu vị trí của pivotIndex lớn hơn k-1, tìm ở bên trái của pivot
        quickSelect(arr, low, pivotIndex - 1, k);
      } else {
        // Ngược lại, tìm ở bên phải của pivot
        quickSelect(arr, pivotIndex + 1, high, k);
      }
    }
  };

  // Gọi hàm quickSelect để bắt đầu quá trình tìm kiếm
  quickSelect(arr, 0, arr.length - 1, k);
}

// 9. Tổ hợp
function combination(n, k) {
  const calculateCombination = (n, k) => (k === 0 || k === n) ? 1 : combination(n - 1, k - 1) + combination(n - 1, k);
  console.log(`9. Tổ hợp C(${n}, ${k}):`, calculateCombination(n, k));
}

// 10. Sắp xếp nhanh (Quick Sort)
function quickSort(arr) {
  if (arr.length <= 1) return arr;
  const pivot = arr[0];
  const left = arr.slice(1).filter(num => num < pivot);
  const right = arr.slice(1).filter(num => num >= pivot);
  console.log("10. Mảng sau khi sắp xếp nhanh:", [...quickSort(left), pivot, ...quickSort(right)]);
}

// Test các thuật toán
const arrayExample = [3, 7, 1, 9, 5, 2, 8, 4, 6];

// findMax(arrayExample);
// reverseString("Hello, World!");
// findUnique(arrayExample);
// sortArray(arrayExample);
// isPalindrome("madam");
// isPrime(2);
// convertBase(42, 2);
findKthLargest(arrayExample, 9);
// combination(5, 2);
// quickSort(arrayExample);
