const canvas = document.getElementById("sequence");
const context = canvas.getContext("2d");

canvas.width = 3840;
canvas.height = 2160;

const frameCount = 300;

const currentFrame = (index) =>
  `frames/frame_${String(index).padStart(5,"0")}.webp`;

const images = [];

for(let i=1;i<=frameCount;i++){
  const img = new Image();
  img.src = currentFrame(i);
  images.push(img);
}

images[0].onload = () => {
  context.drawImage(images[0],0,0,3840,2160);
};

function render(index){
  context.clearRect(0,0,canvas.width,canvas.height);
  context.drawImage(images[index],0,0,3840,2160);
}

window.addEventListener("scroll",()=>{
  const scrollTop = window.scrollY;

  const maxScroll =
    document.body.scrollHeight -
    window.innerHeight;

  const progress = scrollTop/maxScroll;

  const frameIndex = Math.min(
    frameCount-1,
    Math.floor(progress*(frameCount-1))
  );

  requestAnimationFrame(()=>{
    render(frameIndex);
  });
});
