export const protect = (req, res, next) => {
  // Later: verify JWT here
  next();
};
