import { useState } from 'react';
import { isNumeric, isExactLength } from '../utils/ValidateFilds'; 

import React from 'react'

export default function useNumEmployeeValidation() {
    
    const [numEmployee, setNumEmployee] = useState<string>("");
    const [isNumberValid, setIsNumberValid] = useState<boolean | null>(null);
    const [isValidLength, setIsValidLength] = useState<boolean | null>(null);

  
    const handleNumEmployeeChange = (text: string) =>{
        setNumEmployee(text);
        setIsNumberValid(isNumeric(text));
        setIsValidLength(isExactLength(text, 6));
    }

    return {
        numEmployee,
        isNumberValid,
        isValidLength,
        handleNumEmployeeChange
  }
}
