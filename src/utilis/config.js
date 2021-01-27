const production = {
  Hello: "Production",
  connectPHP: "http://10.1.5.143:2279",
  connectMainAPI: "http://10.1.5.143:5000",
  connectComplaintAPI: "http://10.1.5.143:5002",
  connectResearchAPI: "http://10.1.5.143:5003",
};

const dev = {
  Hello: "Develop",
  connectPHP: "http://10.1.5.143:2079",
  connectMainAPI: "http://10.1.5.143:6001",
  connectComplaintAPI: "http://10.1.5.143:6002",
  connectResearchAPI: "http://10.1.5.143:6003",
};

export const config = process.env.NODE_ENV === "development" ? dev : production;