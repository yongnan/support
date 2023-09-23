/* eslint-disable @typescript-eslint/no-unused-vars */

export {}

/**
 * Generic Interfaces - FP Perspective
 *  - Type Argument Constraints
 */

interface FormField<T extends string | number | boolean>{
    value?: T;
    defaultValue: T;
    isValid: boolean;
}

//Generic. Can be called with any`FormField`. 
function getFieldValue<T extends string | number | boolean>(field: FormField<T>): T{
    if (!field.isValid || field.value === undefined) {
        // On the other hand, we don't know anything about the type 
        // of `field.defaultValue`.
        return field.defaultValue;
    }
    return field.value;
}    