export const sendMessage = async (message) => {
  console.log("Sending:", message);

  return {
    reply: "TEST SUCCESS: " + message,
  };
};
