// descriptive error messages for timeouts
const base = "took too long";
const timeouts = {
  fcp: `${base} to load `,
  tti: `${base} to become interactive `,
  message: `${base} to display error message`,
};

// URl Constants
const baseUrl = "https://pscollege841.examly.net";
const urls = {
  emailPage: `${baseUrl}/login`,
  passwordPage: `${baseUrl}/pwd`,
  dashboardPage: `${baseUrl}/dashboard`,
  coursePage: `${baseUrl}/course`,
};

// Inputs for email and password fields
const inputs = {
  validMail: "studentpractice1@examly.in",
  inValidMail: "hello.com",
  unregisteredMail: "hello@qwe.co",
  validPassword: "studentpractice1",
  inValidPassword: "hello",
};

module.exports = { urls, inputs, timeouts };
