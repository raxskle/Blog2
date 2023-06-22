function addHandleClickImg() {
  const mdImg = document.querySelectorAll(".md-content img");
  // console.log(mdImg);
  mdImg.forEach((img) => {
    // console.log("img:", img);
    if (img.addEventListener) {
      img.addEventListener("click", () => {
        console.log("todo:查看大图");
        alert("todo:查看大图");
      });
    }
  });
}

export { addHandleClickImg };
