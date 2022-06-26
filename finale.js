const data = {
    "DataSet1": {
        "DateOfBirth": "2000-20-07",
        "Email": "johndoe@gmail.com",
        "IdNumber": "12345678",
        "Name": "John Doe",
        "Phone": "254711000001"
    },

    "DataSet2": {
        "DateOfBirth": "2000-20-07",
        "IdNumber": "12345678",
        "Name": "Doe John",
        "Phone": [
            "254711000001",
            "254711000002"
        ]
    },

    "DataSet3": {
        "Grade": "BB",
        "Probability": "3.8"
    }
}

/* We shall make use of the string-similarity node package 
 * The code for the package with its usage licence has been included in 
 * the packageCode.js and LICENCE files
*/
const stringSimilarity = require("string-similarity")

/*Initialise the dataset to variables*/
const firstDataset = data.DataSet1
const secondDataset = data.DataSet2


/*We shall solve this problem using the specified rules
 * Name comparison - DataSet1 and DataSet2 (Note DataSet2 to take precedence)
 * If mobilephone number DataSet1 <> DataSet2 mobile number = 0
 * If year of birth DataSet1 <> DataSet2 = 0
 * If email  DataSet1 <> DataSet2 = 0 = -10
*/

/* LOGIC FLOW - Aim is to create a program which scales
 * Access the keys of the first dataset
 * Map over every key of the first dataset while checking if the second dataset includes this key
 * If there is no match, return 0 (this is the case when a key is only present in one of the datasets)
 * If there is a match, start by checking the type of the values of the keys, in both datasets
 * If both are strings, use the compareTwoStrings() method
 * If one of them is an Array, use the findBestMatch() method
*/
const comparedItemsArray = []
const comparisonArray = Object.keys(firstDataset).map(key => {
    if(Object.keys(secondDataset).includes(key)){
        if(typeof firstDataset[key] === 'string' && typeof secondDataset[key] === 'string') {
            const result = stringSimilarity.compareTwoStrings(firstDataset[key], secondDataset[key])
            comparedItemsArray.push(result)
            return result
        } 
        else if (Array.isArray(firstDataset[key])){
            const result = stringSimilarity.findBestMatch(secondDataset[key], firstDataset[key])
            comparedItemsArray.push(result)
            return result.bestMatch.rating
        } 
        else if (Array.isArray(secondDataset[key])){
            const result = stringSimilarity.findBestMatch(firstDataset[key], secondDataset[key])
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
        return grade = "CC"
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
    

// console.log(comparisonArray)
console.log("Probability: " + probability.toFixed(1))
// console.log(score)    
console.log("Grade: " + grade)