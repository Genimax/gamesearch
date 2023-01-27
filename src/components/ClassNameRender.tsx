const classNameRender: Function = (
  path: string,
  secondaryPageReturn: string
): string => {
  if (path !== "/") {
    return secondaryPageReturn;
  }
  return "";
};

export default classNameRender;
