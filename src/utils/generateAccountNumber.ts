// El número de las cuentas corrientes y de ahorros deben ser únicos y generarse
// automáticamente, la extensión del número de cuenta debe ser de 
// 10 dígitos numéricos. El número de las 
// cuentas ahorro debe iniciar en “46” y el número de las
// cuentas corriente debe iniciar en “23”
//

enum accountType {
  SAVINGS = 46,
  CURRENT = 23
}

function generateAccountNumber(accType: accountType): number {
  try {
    const randomNumbers = () => {
      const res: string[] = Array.from({ length: 8 }, () => `${Math.round(Math.random() * 9)}`); // [1,2,3,4,5,6,7,8]
      return res.join(""); // 12345678
    }
    return parseInt(`${accType}${randomNumbers()}`);
  } catch (err) {
    console.error("Error on account number generation🚩", err)
    throw new Error(err.message);
  }
}
// console.log("💰️💰️💰️💰️",generateAccountNumber(accountType.SAVINGS));
// console.log("💲💲💲💲",generateAccountNumber(accountType.CURRENT));
export default generateAccountNumber;

