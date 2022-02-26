interface WeightedGrade {
    // the user decides these
    weight: number,
    grade: number,
}

interface GradeElement extends WeightedGrade {
    // used for 'backwards' calculation
    target: number
}


/**
 * Computes the average of all the elements passed in.
 * If an element is null, it is excluded from the average.
 * If all elements are null, null is returned.
 * @param items
 */
export function averageElements(items: GradeElement[]): number {
    let totalWeight = 0;
    let weightedGrades = 0;

    items.forEach(item => {
        // use the target if the grade isn't used
        let assignmentGrade = item.grade ?? item.target;

        // if neither was supplied, we are dealing with an empty assignment
        //      skip it
        if (!assignmentGrade) return;

        totalWeight += item.weight;
        weightedGrades += item.weight * assignmentGrade;
    });

    // if totalWeight is 0: either there are no assignments or they are all set to 0 weight
    //      either way, the gradeCalculated can not be calculated --> null
    if (totalWeight === 0) {
        return null;
    } else {
        return weightedGrades / totalWeight;
    }
}


/**
 * Returns a new set of items based on the 'items' with
 * computed 'gradeTarget's.
 * @param items
 * @param gradeTarget The target grade that each item should average together to create.
 */
export function computeGradeTargets(gradeTarget: number, items: WeightedGrade[]): number {
    // if there is no target grade for this category, the assignments dont get one either
    if (gradeTarget == null) return null;

    // backwards calculate each assignment's target grade

    let totalWeight = 0;
    let knownWeightedGrades = 0;
    let unknownTotalWeight = 0;

    // sum the total weight
    items.forEach(item => {
        totalWeight += item.weight;
    });

    // filter by assignments with an override
    items
        .filter(item => item.grade)
        .forEach(item => {
            knownWeightedGrades = item.weight * item.grade;
        });

    // filter by assignments without an override
    items
        .filter(item => !item.grade)
        .forEach(item => {
            unknownTotalWeight += item.weight;
        });

    return ( gradeTarget * totalWeight - knownWeightedGrades ) / unknownTotalWeight;
}