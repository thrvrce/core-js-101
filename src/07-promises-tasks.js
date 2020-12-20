/* ************************************************************************************************
 *                                                                                                *
 * Plese read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise       *
 *                                                                                                *
 ************************************************************************************************ */


/**
 * Return Promise object that is resolved with string value === 'Hooray!!! She said "Yes"!',
 * if boolean value === true is passed, resolved with string value === 'Oh no, she said "No".',
 * if boolean value === false is passed, and rejected
 * with error message === 'Wrong parameter is passed! Ask her again.',
 * if is not boolean value passed
 *
 * @param {boolean} isPositiveAnswer
 * @return {Promise}
 *
 * @example
 *    const p1 = willYouMarryMe(true);
 *    p1.then(answer => console.log(answer)) // 'Hooray!!! She said "Yes"!'
 *
 *    const p2 = willYouMarryMe(false);
 *    p2.then(answer => console.log(answer)) // 'Oh no, she said "No".';
 *
 *    const p3 = willYouMarryMe();
 *    p3.then(answer => console.log(answer))
 *      .catch((error) => console.log(error.message)) // 'Error: Wrong parameter is passed!
 *                                                    //  Ask her again.';
 */
function willYouMarryMe(isPositiveAnswer) {
  // throw new Error('Not implemented');
  return new Promise((resolve, reject) => {
    if (typeof isPositiveAnswer !== 'boolean') {
      reject(new Error('Wrong parameter is passed! Ask her again.'));
    }
    if (isPositiveAnswer) {
      resolve('Hooray!!! She said "Yes"!');
    } else {
      resolve('Oh no, she said "No".');
    }
  });
}


/**
 * Return Promise object that should be resolved with array containing plain values.
 * Function receive an array of Promise objects.
 *
 * @param {Promise[]} array
 * @return {Promise}
 *
 * @example
 *    const promises = [Promise.resolve(1), Promise.resolve(3), Promise.resolve(12)]
 *    const p = processAllPromises(promises);
 *    p.then((res) => {
 *      console.log(res) // => [1, 2, 3]
 *    })
 *
 */
function processAllPromises(array) {
  // throw new Error('Not implemented');
  // return new Promise((resolve, reject) => {
  //   const test = [];
  //   let i = 0;
  //   function gos() {
  //   // return console.log(`123 ${e}`);
  //     i = array.length;
  //     reject(new Error('qweadww'));
  //   }
  //   for (; i < array.length; i += 1) {
  //     array[i].then(
  //       (result) => test.push(result),
  //       (error) => gos(error),
  //     ).finally(i = array.length);
  //   }
  //   // console.log(message);
  //   // array.forEach((item) => {
  //   //   item.then((result) => test.push(result), (error) => reject(error.message));
  //   // });
  //   if (test.length > 0) {
  //     resolve(test);
  //   }
  //   reject(new Error('asd'));
  // });
  return Promise.all(array);
}

/**
 * Return Promise object that should be resolved with value received from
 * Promise object that will be resolved first.
 * Function receive an array of Promise objects.
 *
 * @param {Promise[]} array
 * @return {Promise}
 *
 * @example
 *    const promises = [
 *      Promise.resolve('first'),
 *      new Promise(resolve => setTimeout(() => resolve('second'), 500)),
 *    ];
 *    const p = processAllPromises(promises);
 *    p.then((res) => {
 *      console.log(res) // => [first]
 *    })
 *
 */
function getFastestPromise(array) {
  // throw new Error('Not implemented');
  return Promise.race(array);
}

/**
 * Return Promise object that should be resolved with value that is
 * a result of action with values of all the promises that exists in array.
 * If some of promise is rejected you should catch it and process the next one.
 *
 * @param {Promise[]} array
 * @param {Function} action
 * @return {Promise}
 *
 * @example
 *    const promises = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)];
 *    const p = chainPromises(promises, (a, b) => a + b);
 *    p.then((res) => {
 *      console.log(res) // => 6
 *    });
 *
 */
async function chainPromises(array, action) {
  // throw new Error('Not implemented');

  const resolvedArr = [];
  async function tryResolvePromises(promiseIndex) {
    if (promiseIndex < array.length) {
      try {
        resolvedArr.push(await array[promiseIndex]);
      } catch (err) { console.log(err.message); }
      return tryResolvePromises(promiseIndex + 1);
    }
    return resolvedArr;
  }

  const result = tryResolvePromises(0)
    .then((res) => Promise.resolve(res.reduce((acc, value) => action(acc, value))))
    .then((res) => Promise.resolve(res));

  return result;
}

module.exports = {
  willYouMarryMe,
  processAllPromises,
  getFastestPromise,
  chainPromises,
};
