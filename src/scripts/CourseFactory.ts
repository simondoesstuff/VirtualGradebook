import {uniqID} from "$scripts/Utils";

export function buildDefault(title: string) {
    return buildCourse({
        title
    });
}

/**
 * Modifies the state passed in to include unique IDs throughout
 * the entire tree. Useful for rendering in the DOM.
 *
 * Returns the state object after being modified.
 *
 * @param state
 */
export function buildCourse(state) {
    state.categories ??= [];
    state.id ??= uniqID();

    for (let category of state.categories) {
        buildCategory(category);
    }

    return state;
}

export function buildCategory(category) {
    category.id ??= uniqID();
    category.assignments ??= [];

    for (let assignment of category.assignments) {
        assignment.id ??= uniqID();
    }

    return category;
}