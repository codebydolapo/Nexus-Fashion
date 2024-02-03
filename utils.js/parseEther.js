function parseEther(etherString) {
    try {
    //   const parts = etherString.match(/((?:\d+(?:\.\d*)?|\.\d+)(?:e[-+]?\d+)?)/i);
    //   if (!parts) {
    //     throw new Error("Invalid ether string");
    //   }
  
      const value = parseFloat(etherString);
    //   const value = parseFloat(parts[1]);
  
      // Use a built-in BigInteger library for precision
      const bigNumber = new BigInteger(value.toString());
      const wei = bigNumber.multiply(new BigInteger("1000000000000000000"));
  
      return wei.toString();
    } catch (error) {
      throw new Error(`Invalid ether string: ${error.message}`);
    }
  }

  export default parseEther