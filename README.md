# non-linear-transformation-npm-package
There is a helping method for graphs name transformDataToNonLinearList. 
This method can transform a random numeric axis data of a graphs into 
nonlinear axis data set. 

**Dependencies:**
- lodash: https://lodash.com/docs/4.17.15 
- set-clustering: https://www.npmjs.com/package/set-clustering

Lodash is a modern JavaScript utility library delivering modularity, performance & extras.
We are using its methods like [cloneDeep, uniq, isUndefined, isNull, isNaN]

Set Clustering is a tool for grouping objects based on similarity.
Give an array of arbitrary elements, and a function to determine how similar two elements are.
The elements can then be divided into a number of groups to your liking.
The elements in each group will be more similar to each other than to elements of other groups.

**Code:**

```javascript
/**
 * @param list: list of numbers
 * @param forceInsertZero: if true the code will add 0 in return axis
 * @param lengthRequireForOutput: optional min number of element you want in response
 */
module.exports.transformDataToNonLinearList = function(
  list = [],
  forceInsertZero = false,
  lengthRequireForOutput = null
) {
  // code is in git 
}
```

**DRY Run:**
See script.js file to precomputed sample output and a sample run function.

**Examples:**

**Sample 1:**

Input `[{"x":59836,"y":4475},{"x":358074,"y":100},{"x":95244,"y":2858},{"x":12184,"y":655},{"x":205809,"y":4913},{"x":123533,"y":66},
{"x":251479,"y":378},{"x":368263,"y":813},{"x":402066,"y":864},{"x":415754,"y":2949},{"x":445232,"y":3064},{"x":364614,"y":1011},
{"x":146937,"y":1248},{"x":104115,"y":3587},{"x":77770,"y":4348},{"x":92350,"y":4652},{"x":87065,"y":912},{"x":125944,"y":4127},{"x":123138,"y":688},
{"x":124141,"y":4129},{"x":140733,"y":568},{"x":475890,"y":2094},{"x":215401,"y":3464},{"x":265129,"y":3053},{"x":23731,"y":4542},
{"x":362218,"y":4871},{"x":455136,"y":2233},{"x":393355,"y":3184},{"x":145136,"y":2237},{"x":433029,"y":1873},{"x":70962,"y":4777},
{"x":285408,"y":844},{"x":281586,"y":2457},{"x":252086,"y":635},{"x":476036,"y":2550},{"x":427947,"y":3169},{"x":495084,"y":1647},
{"x":482966,"y":2947},{"x":106180,"y":4173},{"x":100875,"y":4431},{"x":56636,"y":3064},{"x":62198,"y":4648},{"x":327610,"y":4458},
{"x":452805,"y":1110},{"x":427972,"y":3304},{"x":90057,"y":3781},{"x":356033,"y":1226},{"x":229719,"y":3170},{"x":182785,"y":363},
{"x":147862,"y":4632}]`

output X: `[0, 336930, 408104, 410378, 411543, 414616, 414678, 414820, 415178, 490554]`

output Y: `[0, 585, 603, 604, 3928, 4739, 4741, 4759, 4786, 4793]`

**Sample 2:**

Input: `[{x: -1, y: 10}, {x: -11, y: 15},{x: -5, y: 17}, {x: 7, y: 25},{x: 15, y: 11}, {x: -100, y: 18},{x: 20, y: 50}, {x: 50, y: 50}]`

output X-axis: `[-150,11,16,21,25,29,100]`

output Y-axis: `[-40,10,11,12,100]`

**Sample 3:**

When flag forceInsertZero is set to true.

Input: `[{x: -1, y: 10}, {x: -11, y: 15},{x: -5, y: 17}, {x: 7, y: 25},{x: 15, y: 11}, {x: -100, y: 18},{x: 20, y: 50}, {x: 50, y: 50}]`

output X-axis: `[-150,0,16,24,27,50,100]`

output Y-axis: `[-40,0,13,15,100]`

**Sample 4:**

When flag forceInsertZero is set to true and lengthRequireForOutput is set to 6

Input: `[{x: -1, y: 10}, {x: -11, y: 15},{x: -5, y: 17}, {x: 7, y: 25},{x: 15, y: 11}, {x: -100, y: 18},{x: 20, y: 50}, {x: 50, y: 50}]`

output X-axis: `[-150,0,42,50,100]`

output Y-axis: `[-40,0,13,18,20,100]`