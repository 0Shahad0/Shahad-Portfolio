const root=document.documentElement;
const saved=localStorage.getItem("theme");
if(saved) root.dataset.theme=saved;
else if(window.matchMedia("(prefers-color-scheme: dark)").matches) root.dataset.theme="dark";

const themeToggle=document.getElementById("themeToggle");
const themeIcon=document.getElementById("themeIcon");
function updateIcon(){themeIcon.textContent=root.dataset.theme==="dark"?"☀":"☾"}
updateIcon();
themeToggle.addEventListener("click",()=>{
  root.dataset.theme=root.dataset.theme==="dark"?"light":"dark";
  localStorage.setItem("theme",root.dataset.theme);
  updateIcon();
});

const galleries={
  crisis:{
    kicker:"CRISIS TRAINER · AI-BASED HOSPITAL CRISIS TRAINING SYSTEM",
    title:"From scenario generation to AI-supported evaluation",
    images:["assets/crisis-monitor.jpg","assets/crisis-login.jpg","assets/crisis-generate.jpg","assets/crisis-evaluation.jpg","assets/crisis-score.jpg"]
  },
  skillrise:{
    kicker:"SKILLRISE · AI-POWERED LEARNING PLATFORM",
    title:"A full trainee + supervisor workflow",
    images:["assets/skillrise/skillrise-1.png","assets/skillrise/skillrise-2.png","assets/skillrise/skillrise-3.png","assets/skillrise/skillrise-4.png","assets/skillrise/skillrise-5.png","assets/skillrise/skillrise-6.png"]
  },
  gan:{
    kicker:"DEEP LEARNING · GAN",
    title:"Grayscale → Generated → Ground Truth",
    images:["assets/gan-results.png","assets/gan-training.png"]
  },
  matlab:{
    kicker:"COMPUTER VISION · MATLAB",
    title:"Noise reduction and image restoration",
    images:["assets/matlab-filters.png","assets/matlab-adaptive.png"]
  },
  dm:{
    kicker:"DATA MINING · BEAUTY PRODUCT RECOMMENDATION",
    title:"EDA, modeling, and classifier comparison",
    images:["assets/dm/slide-2.png","assets/dm/slide-3.png","assets/dm/slide-4.png","assets/dm/slide-5.png"]
  },
  dhikr:{
    kicker:"NLP · ARABIC DHIKR CHATBOT",
    title:"Retrieval-based Arabic chatbot",
    images:["assets/dhikr/colab-preprocessing.png","assets/dhikr/colab-tests.png","assets/dhikr/colab-output.png","assets/dhikr/colab-accuracy.png"]
  }
};
const modal=document.getElementById("galleryModal");
const grid=document.getElementById("modalGrid");
const title=document.getElementById("modalTitle");
const kicker=document.getElementById("modalKicker");
document.querySelectorAll(".gallery-btn").forEach(btn=>{
  btn.addEventListener("click",()=>{
    const g=galleries[btn.dataset.gallery];
    kicker.textContent=g.kicker; title.textContent=g.title;
    grid.innerHTML=g.images.map(src=>`<img class="zoomable" src="${src}" alt="">`).join("");
    modal.classList.add("open"); modal.setAttribute("aria-hidden","false");
  });
});
function closeModal(){modal.classList.remove("open");modal.setAttribute("aria-hidden","true")}
document.getElementById("modalClose").addEventListener("click",closeModal);
document.querySelector(".modal-backdrop").addEventListener("click",closeModal);

// Click any project/certificate image to view it larger.
const imageLightbox=document.createElement("div");
imageLightbox.className="image-lightbox";
imageLightbox.innerHTML=`<div class="image-lightbox-backdrop"></div><button class="image-lightbox-close" aria-label="Close image">×</button><img alt="Expanded image">`;
document.body.appendChild(imageLightbox);
const lightboxImg=imageLightbox.querySelector("img");
function openImage(src,alt){lightboxImg.src=src;lightboxImg.alt=alt||"Expanded image";imageLightbox.classList.add("open");}
function closeImage(){imageLightbox.classList.remove("open");lightboxImg.removeAttribute("src");}
document.addEventListener("click",e=>{
  const img=e.target.closest("img.zoomable");
  if(img) openImage(img.currentSrc||img.src,img.alt);
});
imageLightbox.querySelector(".image-lightbox-backdrop").addEventListener("click",closeImage);
imageLightbox.querySelector(".image-lightbox-close").addEventListener("click",closeImage);
document.addEventListener("keydown",e=>{if(e.key==="Escape"){closeModal();closeImage()}});

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target)}})
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));
