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
        let finalAverage = weightedGrades / totalWeight;
        finalAverage = finalAverage = Math.round(finalAverage * 10) / 10;
        return finalAverage;
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
        let categoryWeight = category.weight ?? 1;
        totalWeight += categoryWeight;

        // using the category override
        if (category.gradeOverride != null) {
            let categoryWeight = category.weight ?? 1;
            knownWeightedGrades += category.gradeOverride * categoryWeight;
            continue;
        }

        // using assignments inside the category

        let internalTotalWeight = 0;

        for (let assignment of category.assignments) {
            let assignmentWeight = assignment.weight ?? 1;
            internalTotalWeight += assignmentWeight;
        }

        if (internalTotalWeight === 0) {
            // this should almost never happen
            // but this is effectively meaning
            // that there are no assignments

            // skip the rest of the calculations
            continue;
        }

        for (let assignment of category.assignments) {
            let assignmentWeight = assignment.weight ?? 1;
            let categoryWeight = category.weight ?? 1;

            let relativeWeight = assignmentWeight / internalTotalWeight * categoryWeight;

            if (assignment.gradeOverride != null) {
                // use the set assignment override
                knownWeightedGrades += relativeWeight * assignment.gradeOverride;
            } else {
                // the assignment's grade is "unset"
                unknownTotalWeight += relativeWeight;
            }
        }
    }

    let gradeTarget = (idealGrade * totalWeight - knownWeightedGrades) / unknownTotalWeight;
    gradeTarget = Math.round(gradeTarget * 10) / 10;

    // in this case, there are no assignments possible to set
    if (unknownTotalWeight === 0) {
        gradeTarget = null;
    }

    items.forEach(category => {
        category.assignments.forEach(assignment => {
            assignment.gradeTarget = gradeTarget;
        });
    });

    return items;
}