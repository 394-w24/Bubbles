import { getInstructions } from "./FunctionCalls";

const getIcos = async (url) => {
  return getInstructions(url);
};

export { getIcos };
