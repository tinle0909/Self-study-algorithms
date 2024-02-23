// 32-bit int min-max range
const MIN = -2147483648;
const MAX = 2147483647;

const reverse = (x) => {
  let reveresed = parseInt(x.toString().split("").reverse().join(""));

  if (x < 0) reveresed = reveresed * -1;

  if (reveresed < MIN || reveresed > MAX) {
    return 0;
  }

  return reveresed;
};

// console.log(reverse(-12333));
// =================================| Cheapest Flights Within K Stops |=================
/* 
There are n cities connected by some number of flights. 
You are given an array flights where flights[i] = [fromi, toi, pricei] indicates that there is a flight from city fromi to city toi with cost pricei.

You are also given three integers src, dst, and k, 
return the cheapest price from src to dst with at most k stops. 
If there is no such route, return -1.
*/
/**
 * @param {number} n
 * @param {number[][]} flights
 * @param {number} src
 * @param {number} dst
 * @param {number} k
 * @return {number}
 */
var findCheapestPrice = function (n, flights, src, dst, k) {
  // Initialize adjacency list to store flights information
  const adj = new Map();
  // Initialize an array to track minimum cost to reach each node
  const visited = new Array(n).fill(Number.MAX_VALUE);
  // Cost to reach source node is 0
  visited[src] = 0;

  // Populate adjacency list
  for (const [from, to, price] of flights) {
    if (!adj.has(from)) {
      adj.set(from, []);
    }
    adj.get(from).push([to, price]);
  }

  // Initialize a queue for BFS traversal
  const queue = [[src, 0]];
  // Increment k to account for the extra stop at destination
  k++;

  while (k-- > 0 && queue.length > 0) {
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const [currNode, currPrice] = queue.shift();
      if (adj.has(currNode)) {
        for (const [nextNode, nextPrice] of adj.get(currNode)) {
          // Calculate the new price to reach nextNode
          const newPrice = currPrice + nextPrice;
          // Update if the new price is lower than previously known
          if (newPrice < visited[nextNode]) {
            visited[nextNode] = newPrice;
            queue.push([nextNode, newPrice]);
          }
        }
      }
    }
  }

  // Return the minimum cost to reach destination or -1 if unreachable
  return visited[dst] === Number.MAX_VALUE ? -1 : visited[dst];
};
flights = [
  [0, 1, 100],
  [1, 2, 100],
  [2, 0, 100],
  [1, 3, 600],
  [2, 3, 200],
];
console.log(findCheapestPrice(4, flights, 0, 2, 1));
//https://leetcode.com/problems/cheapest-flights-within-k-stops/description/?envType=daily-question&envId=2024-02-23
