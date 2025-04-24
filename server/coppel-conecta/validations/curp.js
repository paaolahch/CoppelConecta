const CURP_REGEX = /^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z\d]{2}$/;

exports.validateCURP = (text) => {
  // Extraer posibles candidatos a CURP del texto
  const candidates = text.match(/[A-Z0-9]{18}/g) || [];
  
  // Encontrar la primera que cumpla con el patrón
  return candidates.find(candidate => CURP_REGEX.test(candidate));
};