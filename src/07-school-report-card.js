/**
 * 📝 School Report Card Generator
 *
 * Sharma ji ke bete ka report card generate karna hai! Student ka naam aur
 * subjects ke marks milenge, tujhe pura analysis karke report card banana hai.
 *
 * Rules:
 *   - student object: { name: "Rahul", marks: { maths: 85, science: 92, ... } }
 *   - Calculate using Object.values() and array methods:
 *     - totalMarks: sum of all marks (use reduce)
 *     - percentage: (totalMarks / (numSubjects * 100)) * 100,
 *       rounded to 2 decimal places using parseFloat(val.toFixed(2))
 *     - grade based on percentage:
 *       "A+" (>= 90), "A" (>= 80), "B" (>= 70), "C" (>= 60), "D" (>= 40), "F" (< 40)
 *     - highestSubject: subject name with highest marks (use Object.entries)
 *     - lowestSubject: subject name with lowest marks
 *     - passedSubjects: array of subject names where marks >= 40 (use filter)
 *     - failedSubjects: array of subject names where marks < 40
 *     - subjectCount: total number of subjects (Object.keys().length)
 *   - Hint: Use Object.keys(), Object.values(), Object.entries(),
 *     reduce(), filter(), map(), Math.max(), Math.min(), toFixed()
 *
 * Validation:
 *   - Agar student object nahi hai ya null hai, return null
 *   - Agar student.name string nahi hai ya empty hai, return null
 *   - Agar student.marks object nahi hai ya empty hai (no keys), return null
 *   - Agar koi mark valid number nahi hai (not between 0 and 100 inclusive),
 *     return null
 *
 * @param {{ name: string, marks: Object<string, number> }} student
 * @returns {{ name: string, totalMarks: number, percentage: number, grade: string, highestSubject: string, lowestSubject: string, passedSubjects: string[], failedSubjects: string[], subjectCount: number } | null}
 *
 * @example
 *   generateReportCard({ name: "Rahul", marks: { maths: 85, science: 92, english: 78 } })
 *   // => { name: "Rahul", totalMarks: 255, percentage: 85, grade: "A",
 *   //      highestSubject: "science", lowestSubject: "english",
 *   //      passedSubjects: ["maths", "science", "english"], failedSubjects: [],
 *   //      subjectCount: 3 }
 *
 *   generateReportCard({ name: "Priya", marks: { maths: 35, science: 28 } })
 *   // => { name: "Priya", totalMarks: 63, percentage: 31.5, grade: "F", ... }
 */
export function generateReportCard( student ) {

  if ( !student || typeof student !== 'object' || Array.isArray( student ) ) return null
  if ( !student.name || typeof student.name !== 'string' ) return null
  if ( !student?.marks ) return null

  if ( student.marks ) {

    const isValid = Object.values( student.marks ).every( val => typeof val !== "number" || val <= 0 || val > 100 || val.length );
    if ( isValid ) return null
  }

  const getTotalMarks = ( marks ) => {

    return Object.values( marks ).reduce( ( acc, cr ) => {

      return acc + cr

    }, 0 )
  }

  const getHighestMarks = ( marks ) => {

    const highestMarks = Object.entries( marks ).reduce( ( acc, current ) => {
      return acc[ 1 ] > current[ 1 ] ? acc : current;
    }, )

    return Object.keys( Object.fromEntries( [ highestMarks ] ) ).toString()

  }

  const getLowestMarks = ( marks ) => {

    const lowestMarks = Object.entries( marks ).reduce( ( acc, current ) => {
      return acc[ 1 ] < current[ 1 ] ? acc : current;
    }, )

    return Object.keys( Object.fromEntries( [ lowestMarks ] ) ).toString()

  }

  const getPassedSubjects = ( marks ) => {

    const passedSubjects = Object.entries( marks ).filter( ( [ key, value ] ) => value >= 40 )
    return Object.keys( Object.fromEntries( passedSubjects ) )

  }

  const getFailedSubjects = ( marks ) => {

    const failedSubjects = Object.entries( marks ).filter( ( [ key, value ] ) => value <= 39 )
    return Object.keys( Object.fromEntries( failedSubjects ) )

  }

  const findPercentage = ( marks ) => {

    const percentage = Object.values( marks ).reduce( ( acc, current ) => acc + current, 0 ) / Object.keys( marks ).length * 100 / 100
    return Number(percentage.toFixed( 2 ))
  }

  const findGrade = ( percentage ) => {
    let grade = ""
    if ( percentage >= 90 ) {
      grade = "A+"
    } else if ( percentage >= 80 ) {
      grade = "A"
    } else if ( percentage >= 70 ) {
      grade = "B"
    } else if ( percentage >= 60 ) {
      grade = "C"
    } else if ( percentage >= 40 ) {
      grade = "D"
    } else {
      grade = "F"
    }
    return grade
  }

  const getTotalSubjects = ( marks ) => {
    const totalSubjects = Object.entries( marks ).length
    return totalSubjects
  }

  const name = student.name
  const totalMarks = getTotalMarks( student.marks )
  const highestMarks = getHighestMarks( student.marks )
  const lowestMarks = getLowestMarks( student.marks )
  const passedSubjects = getPassedSubjects( student.marks )
  const failedSubjects = getFailedSubjects( student.marks )
  const percentage = findPercentage( student.marks )
  const grade = findGrade( percentage )
  const totalSubjects = getTotalSubjects( student.marks )


  return { name: name, totalMarks, percentage, grade, highestSubject: highestMarks, lowestSubject: lowestMarks, passedSubjects, failedSubjects, subjectCount: totalSubjects }

}
