const _ = require('lodash');
const threshold = 500;
const thresholdOutBoundAxisValue = 50;


const randomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getMinOutBoundValue = (min) => {
  if (min > 5 || min < 0) {
    const newMin = min - thresholdOutBoundAxisValue;

    if (newMin < 0) {
      return newMin;
    }
  }

  return 0;
}

const getMaxOutBoundValue = (max) => {
  return max + thresholdOutBoundAxisValue;
}

const genNumbersToFillDataGap = (min, max, list) => {
  const diff = max - min;
  const size = list.length;

  if (diff > size) {
    let points = [], i = 0;
    let numbOfIteration = diff;

    if (diff > threshold) {
      numbOfIteration = threshold;
    }

    while (i < numbOfIteration) {
      points.push(randomInteger(min, max))
      i++;
    }

    points = _.uniq([...points, ...list]);
    points.sort((x, y) => x - y);

    return points;
  }

  return list;
}

/**
 *
 * @param lengthRequireForOutput: expected length of response list
 * @param forceInsertZero: true if force insert 0 in response
 * @param hasNegNum: true if data set has negative numbers
 * @returns {number} expected size of response array
 */
const getHowManyDataGroupsExpected = (lengthRequireForOutput, forceInsertZero = false, hasNegNum = false) => {
  let howManyGroups;

  if (lengthRequireForOutput) {
    if (lengthRequireForOutput <= 1) {
      throw "Please define length of out atleast 2";
    }

    if (forceInsertZero) {
      howManyGroups = lengthRequireForOutput - 1;
    }

    howManyGroups = howManyGroups - 2;
  } else {
    if (hasNegNum) {
      howManyGroups = 7
    } else {
      howManyGroups = 5
    }

    if (forceInsertZero) {
      howManyGroups = howManyGroups - 1;
    }
  }

  if (howManyGroups <= 2) {
    howManyGroups = 2;

    if (!forceInsertZero) {
      howManyGroups++;
    }
  }

  return howManyGroups;
};

/**
 *
 * @param data: array of numbers
 * @param howManyGroups: number of groups in response
 * @returns {*[]}: list of data groups
 */
const createDataGroups = (data, howManyGroups) => {
  const cluster = require('set-clustering');
  let groups;
  const c = cluster(data, (e1, e2) => 1 / Math.pow( Math.max(e1, e2) - Math.min(e1, e2), 3));

  if (data && data.length > (howManyGroups * 2)) {
    groups = c.groups(howManyGroups * 2);
  } else if (data && data.length > howManyGroups) {
    groups = c.groups(howManyGroups);
  } else if (data && data.length > 1) {
    groups = c.groups(data.length - 1);
  } else {
    groups = [[data]];
  }

  return groups;
};

/**
 *
 * @param groups: list of numbers
 * @returns {*[]}: flat list of numbers
 */
const getNonLinearResultsFromGroups = (groups) => {
  const avgDiff = [];
  const list = groups.map((list) => {
    list.sort((a, b) => a - b);

    return list[list.length - 1];
  });

  list.sort((a, b) => a - b);

  for (let i = 1; i < list.length; i++) {
    avgDiff.push(list[i] - list[i - 1]);
  }

  const average = _.sum(avgDiff) / avgDiff.length;

  return list.filter(e => e > average);
};

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
  let nonLinearResults = [], groups, howManyGroups, data = _.cloneDeep(list);

  if (!data || data.length <= 1) {
    throw "Data points count is very small";
  }

  data = _.uniq(data);
  data = data.filter(d => !_.isUndefined(d) && !_.isNull(d) && !_.isNaN(d));
  const max = Math.max(...data);
  const min = Math.min(...data);
  const hasNegNum = data.findIndex(d => d < 0) !== -1;
  const minBoundValue = getMinOutBoundValue(min);
  const maxBoundValue = getMaxOutBoundValue(max);

  howManyGroups = getHowManyDataGroupsExpected(lengthRequireForOutput, forceInsertZero, hasNegNum);
  data = genNumbersToFillDataGap(min, max, data);
  groups = createDataGroups(data, howManyGroups);
  nonLinearResults = getNonLinearResultsFromGroups(groups);
  nonLinearResults = _.uniq(nonLinearResults);
  nonLinearResults.sort((x, y) => x - y);

  if (howManyGroups && nonLinearResults.length > howManyGroups) {
    nonLinearResults = _.slice(nonLinearResults, 0, howManyGroups);
  }

  nonLinearResults = [minBoundValue, ...nonLinearResults, maxBoundValue];

    // make sure zero is available in list. This is for computing on linear axis for graphs
  if (forceInsertZero) {
    nonLinearResults.push(0);
  }

  nonLinearResults = _.uniq(nonLinearResults);
  nonLinearResults.sort((x, y) => x - y);

  return nonLinearResults;
}
