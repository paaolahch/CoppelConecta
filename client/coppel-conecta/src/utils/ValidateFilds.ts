export function validatePassword(password: string): boolean{
    const hasLetter = /[a-zA-z]/.test(password);
    const hasNumber = /\d/.test(password)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)
    
    return hasLetter && hasNumber && hasSpecialChar
}

export function isNumeric(input: string): boolean {
    if (!input) return true; // Si no hay texto, se considera válido (podrías ajustar esto según lo que quieras)
    const isValidNumber = /^\d+$/.test(input); // Verifica que solo sean números
    return isValidNumber;
  }

export function isExactLength(input: string, length: number): boolean {
    return input.length === length;
  }
