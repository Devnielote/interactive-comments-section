export const getRandomId = () => {
  return Math.floor(Math.random() * Date.now());
};
export const mediaQueryList: any = window.matchMedia("(min-width: 700px)");
