export const transformSymbolIds = (arr) => {
  try {
    const transformedArray = arr.map((x) => {
      const num = Number(x);
      if (isNaN(num)) {
        // Check if the conversion result is NaN
        throw new Error(`Cannot convert "${x}" to a Number`);
      }
      return num;
    });
    return transformedArray;
  } catch (error) {
    console.error("Error while processing: ", error.message);
    return arr.join(", ");
  }
};

export const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
