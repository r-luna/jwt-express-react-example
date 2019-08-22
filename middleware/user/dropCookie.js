
const dropCookie = () => {
  return (req, res, next) => {
    const { exists, authorized } = res.locals.user;
    if (exists && authorized) {

    } else {
      
    }
  }
};

module.exports = dropCookie;
