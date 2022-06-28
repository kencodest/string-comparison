function compareTwoStrings(first, second) {
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

	return (2.0 * intersectionSize) / (first.length + second.length - 2);
}

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

function areArgsValid(mainString, targetStrings) {
	if (typeof mainString !== 'string') return false;
	if (!Array.isArray(targetStrings)) return false;
	if (!targetStrings.length) return false;
	if (targetStrings.find( function (s) { return typeof s !== 'string'})) return false;
	return true;
}


const checkValidFields=(dataset)=>{
  let isValid;

  if(!dataset.DateOfBirth) return isValid = false;
  if(!dataset.Email) return isValid = false;
  if(!dataset.IdNumber) return isValid = false;
  if(!dataset.Name) return isValid = false;
  if(!dataset.Phone) return isValid = false
  else{
      return isValid = true;
  }

}

function comparison(firstDataset, secondDataset){
  /* An array to keep track of the items that have been compared*/
  const comparedItemsArray = []
  const comparisonArray = Object.keys(firstDataset).map(key => {
      if(Object.keys(secondDataset).includes(key)){
          if(typeof firstDataset[key] === 'string' && typeof secondDataset[key] === 'string') {
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


exports.grading=function grading(firstDataset, secondDataset){
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

  return {
      "Grade" : grade,
      "Probability" : probability.toFixed(1)
  }
}

