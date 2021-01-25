const prod = {
  Hello: "Production",
  connectMainAPI: "http://10.1.5.143:5000",
};

const dev = {
  Hello: "Develop",
  connectMainAPI: "http://localhost:5000",
};

export const config = process.env.NODE_ENV === "development" ? dev : prod;
