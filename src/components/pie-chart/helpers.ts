import * as d3 from "d3";
// inspired by https://jsfiddle.net/rshaker/rbmgacep/
export function mergeWithFirstEqualZero(first, second) {
  var secondSet = d3.set();

  second.forEach(function (d) {
    secondSet.add(d.key);
  });

  var onlyFirst = first
    .filter(function (d) {
      return !secondSet.has(d.key);
    })
    .map(function (d) {
      return { key: d.key, value: 0 };
    });

  var sortedMerge = d3.merge([second, onlyFirst]).sort(function (a, b) {
    return d3.ascending(a.key, b.key);
  });

  return sortedMerge;
}
