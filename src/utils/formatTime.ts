function formatTime(time: number) {
  const m = Math.floor(time / 60);
  const s = Math.floor(time % 60);
  // console.log(m, s);
  let ss = "";
  if (s < 10) {
    ss = "0" + s.toString();
  } else {
    ss = s.toString();
  }
  return m.toString() + ":" + ss;
}

export { formatTime };
