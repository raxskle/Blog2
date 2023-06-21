function debounce(func: any, delay: number) {
  let timer: null | NodeJS.Timeout;
  return function () {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func();
    }, delay);
  };
}

export { debounce };
