/* eslint-disable @typescript-eslint/no-unused-vars */

export {}

/**
 * Generic Interfaces - FP Perspective
 */

interface FormField<T>{
    value?: T;
    defaultValue: T;
    isValid: boolean;
}

//Very specialized. Only works with `FormField<string>`.
function getStringFieldValue(field: FormField<string>): string{
    if (!field.isValid || field.value === undefined) {
        // Thanks to the specialization, the compiler knows the exact type 
        // of `field.defaultValue`.
        return field.defaultValue.toLowerCase();
    }
    return field.value; 
}

//Generic. Can be called with any`FormField`. 
function getFieldValue<T>(field: FormField<T>): T{
    if (!field.isValid || field.value === undefined) {
        // On the other hand, we don't know anything about the type 
        // of `field.defaultValue`.
        return field.defaultValue;
    }
    return field.value;
}    