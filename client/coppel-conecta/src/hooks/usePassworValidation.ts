import { useState } from 'react';
import { validatePassword } from '../utils/ValidateFilds'; 

export default function usePassworValidation() {
    const [password, setPassword] = useState('');
    const [isValid, setIsValid] = useState<boolean | null>(null);

    const handlePasswordChange = (text: string) => {
        setPassword(text);
        setIsValid(validatePassword(text));
    };

    return {
        password,
        isValid,
        handlePasswordChange
    }
}
