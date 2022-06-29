/* Compare two strings */
function compareTwoStrings(first, second) {
    /* Regular expressions*/
	first = first.replace(/\s+/g, '')
	second = second.replace(/\s+/g, '')

	if (first === second) return 1; // identical or empty
	if (first.length < 2 || second.length < 2) return 0; // if either is a 0-letter or 1-letter string

	let firstBigrams = new Map();
	for (let i = 0; i < first.length - 1; i++) {
		const bigram = first.substring(i, i + 2);
		const count = firstBigrams.has(bigram)
			? firstBigrams.get(bigram) + 1
			: 1;

		firstBigrams.set(bigram, count);
	};

	let intersectionSize = 0;
	for (let i = 0; i < second.length - 1; i++) {
		const bigram = second.substring(i, i + 2);
		const count = firstBigrams.has(bigram)
			? firstBigrams.get(bigram)
			: 0;

		if (count > 0) {
			firstBigrams.set(bigram, count - 1);
			intersectionSize++;
		}
	}

    /* The Dice Coefficient similarity formula */
	return (2.0 * intersectionSize) / (first.length + second.length - 2);
}

/* checks similarity of a string against an array of strings and picks the best match */
function findBestMatch(mainString, targetStrings) {
	if (!areArgsValid(mainString, targetStrings)) throw new Error('Bad arguments: First argument should be a string, second should be an array of strings');
	
	const ratings = [];
	let bestMatchIndex = 0;

	for (let i = 0; i < targetStrings.length; i++) {
		const currentTargetString = targetStrings[i];
		const currentRating = compareTwoStrings(mainString, currentTargetString)
		ratings.push({target: currentTargetString, rating: currentRating})
		if (currentRating > ratings[bestMatchIndex].rating) {
			bestMatchIndex = i
		}
	}
	
	
	const bestMatch = ratings[bestMatchIndex]
	
	return { ratings: ratings, bestMatch: bestMatch, bestMatchIndex: bestMatchIndex };
}


/* check if the passed arguments are strings. */
function areArgsValid(mainString, targetStrings) {
	if (typeof mainString !== 'string') return false;
	if (!Array.isArray(targetStrings)) return false;
	if (!targetStrings.length) return false;
	if (targetStrings.find( function (s) { return typeof s !== 'string'})) return false;
	return true;
}


/*
 * LOGIC FLOW 
 * Access the keys/property names of the first dataset
 * Map over every key of the first dataset while checking if the second dataset includes this key
 * If there is no match, return 0 (this is the case when a key is only present in one of the datasets)
 * If there is a match, start by checking the type of the values of the keys, in both datasets
 * Additionally, check if there is a 'DateOfBirth' property. If so, slice the value to get the yearOfBirth
 * If not, continue with execution
 * If both are strings, use the compareTwoStrings() method
 * If one of them is an Array, use the findBestMatch() method
*/


/* Takes two arguments, which should be objects and does the string comparison */
function comparison(firstDataset, secondDataset){
  /* An array to keep track of the items that have been compared*/
  const comparedItemsArray = []
  const comparisonArray = Object.keys(firstDataset).map(key => {
      if(Object.keys(secondDataset).includes(key)){
          if(typeof firstDataset[key] === 'string' && typeof secondDataset[key] === 'string') {
            if(key === "DateOfBirth"){
                const result = compareTwoStrings(firstDataset[key].slice(0,4), secondDataset[key].slice(0,4))
                comparedItemsArray.push(key)
                return result
            }
            const result = compareTwoStrings(firstDataset[key], secondDataset[key])
            comparedItemsArray.push(result)
            return result
          } 
          else if (Array.isArray(firstDataset[key])){
              const result = findBestMatch(secondDataset[key], firstDataset[key])
              comparedItemsArray.push(result)
              return result.bestMatch.rating
          } 
          else if (Array.isArray(secondDataset[key])){
              const result = findBestMatch(firstDataset[key], secondDataset[key])
              comparedItemsArray.push(result)
              return result.bestMatch.rating
          }
      } else {
          return 0
      }
  })


    /* Use the .reduce() method to get the sum of elements in the comparisonArray */
    const probability = comparisonArray.reduce((total, current) => {
        return total + current
    }, 0)


    /* Calculate the final score for grading */
    const score = probability / comparedItemsArray.length

    /* Object literal syntax extension*/
    return { probability, score }
}


exports.grading = function grading(firstDataset, secondDataset){
  /* Object destructuring */
  const { probability, score } = comparison(firstDataset, secondDataset)

  /* Grading */
  let grade = ""
  switch(true){
      case (score === 1):
          grade = "AA";
          break;

      case (score < 1):
          grade = "BB"
          break
      
      case (score < 0.9):
          grade = "CC"
          break

      case (score < 0.8):
          grade = "DD"
          break

      case (score < 0.7):
          grade = "EE"
          break

      case (score < 0.6):
          grade = "FF"
          break

      case (score < 0.5):
          grade = "GG"
          break

      case (score < 0.4):
          grade = "HH"
          break

      default:
          break
          
  }


  /* result */
  return {
    "Grade" : grade,
    "Probability" : probability.toFixed(1)
  }
}

