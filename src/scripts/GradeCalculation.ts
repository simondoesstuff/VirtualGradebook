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
        if (assignmentGrade == null) return;

        item.weight ??= 1;
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
 * computed 'idealGrade's.
 * @param items
 * @param idealGrade The target grade that each item should average together to create.
 */
export function computeGradeTargets(idealGrade, items) {
    // if there is no target grade for this category, the assignments dont get one either
    if (idealGrade == null) return items;

    // backwards calculate each assignment's target grade

    let totalWeight = 0;
    let knownWeightedGrades = 0;
    let unknownTotalWeight = 0;

    for (let category of items) {
        if (category.gradeOverride != null) {
            category.weight ??= 1;
            totalWeight += category.weight;
            knownWeightedGrades += category.gradeOverride * category.weight;
            continue;
        }

        let internalTotalWeight = 0;

        for (let assignment of category.assignments) {
            assignment.weight ??= 1;
            internalTotalWeight += assignment.weight;
        }

        for (let assignment of category.assignments) {
            let relativeWeight = assignment.weight / internalTotalWeight * category.weight;

            if (assignment.gradeOverride !== null) {
                knownWeightedGrades += relativeWeight * assignment.gradeOverride;
            } else {
                unknownTotalWeight += relativeWeight;
            }

            totalWeight += relativeWeight;
        }
    }

    let gradeTarget = (idealGrade * totalWeight - knownWeightedGrades) / unknownTotalWeight;

    items.forEach(category => {
        category.assignments.forEach(assignment => {
            assignment.gradeTarget = gradeTarget;
        });
    });

    return items;
}