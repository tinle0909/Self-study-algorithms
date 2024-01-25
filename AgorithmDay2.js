//1. Quick Sort:
function quickSort(arr) {
    if (arr.length <= 1) return arr;

    const pivot = arr[0];
    // console.log("pivot", pivot);
    const left = [];
    const right = [];

    for (let i = 1; i < arr.length; i++) {
        //đảo dấu để sort ngược lại
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    return [...quickSort(left), pivot, ...quickSort(right)];
}

const unsortedArray = [3, 1, 4, 1, 5, 9, 2, 12, 5, 3, 5];
const sortedArray = quickSort(unsortedArray);

/*
Giải thích: Quick Sort là một thuật toán sắp xếp dựa trên việc chia mảng thành các phần nhỏ dựa vào một phần tử gọi là pivot. Sau đó, các phần nhỏ này được sắp xếp đệ qui.
Giải thích hàm quickSort sẽ nhận 1 mảng vào,
 sau đó nó sẽ lấy phần tử đầu tiên đi so sánh với các thành phần khác trong mảng
, nếu phần tử đầu tiên( privot) mà nhỏ hơn phần tử thư i thì nó sẽ thêm vào mảng left, những phần tử lớn hơn pivot sẽ vào mảng right,
 sau đó sẽ trả về [...quickSort(left), pivot, ...quickSort(right)];
 có nghĩ là
 left giờ đây là [1, 1, 2]
 right là [4, 5, 9, 12, 5, 3, 5]

 =====| LEFT |=====
 sau đó khi gọi ... (spread) của ...quickSort(left)
 thì giờ đây pivot là 1
 mảng left sẽ là 1
 từ đó mảng left sẽ là []  right là [1, 1, 2]

 =====| RIGHT |====
 sau đó khi gọi ... (spread) của ...quickSort(right)
 thì pivot của case này sẽ là 4
 mảng left của case right (1) là [3]
 right là [4, 5, 9, 12, 5, 5]

 và vì mảng right hiện tại mảng left  lenght là 1 thoả điều kiện
if (arr.length <= 1) return arr;
 thì sẽ trả về 1 mảng 1 phần tử là 3
 tiếp theo ta tiếp tục right (2) là [4, 5, 9, 12, 5, 5] => pivot là 4 => mảng left là [4] => return mảng left ( return [4])

 tiếp theo mảng right (3) là [ 5, 9, 12, 5, 5] => pivot là 5 ==> mảng left là [5, 5, 5] right là [9, 12]

 mảng left [5 ,5 ,5] thì mảng left của nó sẽ là [] và right là []
 và retủrn sẽ là [], [5, 5, 5],[] pivot ở đây là 1 mảng chưa các pivot

 sau đó thì còn lại mảng right (4) là [9, 12]

 thì pivot là 9 left [] right [12] ==> [], [9] , [12]

 sau khi chạy đệ qui hay spread thì kết qua cuối cùng sẽ là
 [1, 1, 2, 3, 3,
   4, 5, 5, 5, 9,
  12]
*/
// console.log(sortedArray);
// ====================================================================================| 2. Binary Search  |========================================================================================================================
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return -1; // Not found
}
/*
Giải thích: Binary Search là một thuật toán tìm kiếm trong mảng đã sắp xếp.
 Nó so sánh giá trị tìm kiếm với giá trị ở giữa mảng, 
 loại bỏ một nửa mảng mà không chứa giá trị tìm kiếm và tiếp tục tìm kiếm trong nửa còn lại.
*/
const sortedArray2 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const target = 9;
const result = binarySearch(sortedArray2, target);
console.log(result);
// ==========================================================================| 3. Dijkstra's Algorithm |==================================================================================================================================

function dijkstra(graph, start) {
    const distances = {};
    const queue = [];
    distances[start] = 0;

    for (const vertex in graph) {
        if (vertex !== start) {
            distances[vertex] = Infinity;
        }
        queue.push(vertex);
    }

    while (queue.length) {
        queue.sort((a, b) => distances[a] - distances[b]);
        const current = queue.shift();

        for (const neighbor in graph[current]) {
            const newDist = distances[current] + graph[current][neighbor];
            if (newDist < distances[neighbor]) {
                distances[neighbor] = newDist;
            }
        }
    }

    return distances;
}

const graph = {
    A: { B: 1, C: 4 },
    B: { A: 1, C: 2, D: 5 },
    C: { A: 4, B: 2, D: 1 },
    D: { B: 5, C: 1 },
};

const startVertex = 'A';
const resultDijkstra = dijkstra(graph, startVertex);
console.log(resultDijkstra);
/*
Giải thích: Dijkstra's Algorithm là một thuật toán tìm đường đi ngắn nhất giữa hai đỉnh trên đồ thị với trọng số dương.
*/