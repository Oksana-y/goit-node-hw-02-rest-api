const ctrlWrapper = (ctrl) => {
    const func = async (req, res, next) => {
      try {
        ctrl(req, res, next);
      } catch (error) {
        next(error);
      }
    };
    return func;
  };
  
  export default ctrlWrapper;