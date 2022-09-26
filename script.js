/**
 * Sample 1:
 * getNonLinearAxis([], 15);
 *
 * Run:
 * Input [{"x":59836,"y":4475},{"x":358074,"y":100},{"x":95244,"y":2858},{"x":12184,"y":655},{"x":205809,"y":4913},{"x":123533,"y":66},
 * {"x":251479,"y":378},{"x":368263,"y":813},{"x":402066,"y":864},{"x":415754,"y":2949},{"x":445232,"y":3064},{"x":364614,"y":1011},
 * {"x":146937,"y":1248},{"x":104115,"y":3587},{"x":77770,"y":4348},{"x":92350,"y":4652},{"x":87065,"y":912},{"x":125944,"y":4127},{"x":123138,"y":688},
 * {"x":124141,"y":4129},{"x":140733,"y":568},{"x":475890,"y":2094},{"x":215401,"y":3464},{"x":265129,"y":3053},{"x":23731,"y":4542},
 * {"x":362218,"y":4871},{"x":455136,"y":2233},{"x":393355,"y":3184},{"x":145136,"y":2237},{"x":433029,"y":1873},{"x":70962,"y":4777},
 * {"x":285408,"y":844},{"x":281586,"y":2457},{"x":252086,"y":635},{"x":476036,"y":2550},{"x":427947,"y":3169},{"x":495084,"y":1647},
 * {"x":482966,"y":2947},{"x":106180,"y":4173},{"x":100875,"y":4431},{"x":56636,"y":3064},{"x":62198,"y":4648},{"x":327610,"y":4458},
 * {"x":452805,"y":1110},{"x":427972,"y":3304},{"x":90057,"y":3781},{"x":356033,"y":1226},{"x":229719,"y":3170},{"x":182785,"y":363},
 * {"x":147862,"y":4632}]
 * output X: [0, 336930, 408104, 410378, 411543, 414616, 414678, 414820, 415178, 490554]
 * output Y: [0, 585, 603, 604, 3928, 4739, 4741, 4759, 4786, 4793]
 *
 * Sample 2:
 * getNonLinearAxis([
 *    {x: -1, y: 10}, {x: -11, y: 15},{x: -5, y: 17}, {x: 7, y: 25},
 *    {x: 15, y: 11}, {x: -100, y: 18},{x: 20, y: 50}, {x: 50, y: 50}
 * ]);
 * Run:
 * Input: [{x: -1, y: 10}, {x: -11, y: 15},{x: -5, y: 17}, {x: 7, y: 25},{x: 15, y: 11}, {x: -100, y: 18},{x: 20, y: 50}, {x: 50, y: 50}]
 * output X-axis: [-105, -35, -34, -26, -21, -20, 11, 12, 15, 44, 45, 49, 55]
 * output Y-axis: [0, 18, 24, 28, 35, 44, 45, 47, 49, 55]
 *
 * Sample 3:
 * When flag forceInsertZero is set to true.
 * getNonLinearAxis([
 *    {x: -1, y: 10}, {x: -11, y: 15},{x: -5, y: 17}, {x: 7, y: 25},
 *    {x: 15, y: 11}, {x: -100, y: 18},{x: 20, y: 50}, {x: 50, y: 50}
 * ], true);
 * Run:
 * Input: [{x: -1, y: 10}, {x: -11, y: 15},{x: -5, y: 17}, {x: 7, y: 25},{x: 15, y: 11}, {x: -100, y: 18},{x: 20, y: 50}, {x: 50, y: 50}]
 * output X-axis: [-105, -82, -81, -73, 0, 36, 37, 39, 40, 41, 42, 44, 47, 55]
 * output Y-axis: [0, 25, 28, 31, 43, 45, 46, 47, 49, 55]
 */

console.log(require("non-linear-transformation"));
const transformDataToNonLinearList = require("non-linear-transformation").transformDataToNonLinearList;
const debug = true;

const createDummyData = () => {
  const size = 50;
  let points = [], i = 0;

  while (i < size) {
    points.push({
      x: Math.floor(Math.random() * 500000),
      y: Math.floor(Math.random() * 5000)
    })
    i++;
  }

  return points;
};

/**
 *
 * @param xYList: list of objects with x, y attributes
 * @param lengthRequireForOutput: min number of elements you want in response array after transformation
 * @param forceInsertZero: if true the code will add 0 in return axis
 */
const sampleRun = (xYList = [], forceInsertZero = false, lengthRequireForOutput = null) => {
  // add parameter points to function and pass this.customerdata
  let points = xYList;

  if (debug && (!xYList || xYList.length <= 0)) {
    points = createDummyData();
  } else if (!xYList || xYList.length <= 0) {
    throw "Please provide valid array of x,y object in function";
  }

  const nonLinearResultsX_axis = transformDataToNonLinearList(
    points.map(a => a["x"]),
    forceInsertZero,
    lengthRequireForOutput
  );
  const nonLinearResultsY_axis = transformDataToNonLinearList(
    points.map(a => a["y"]),
    forceInsertZero,
    lengthRequireForOutput
  );

  debug && console.log(
    "@cluster input, output: ",
    JSON.stringify(points),
    nonLinearResultsX_axis,
    nonLinearResultsY_axis
  );

  return {
    nonLinearResultsX_axis,
    nonLinearResultsY_axis
  }
}

sampleRun()