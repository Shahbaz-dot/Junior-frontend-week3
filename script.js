const menuToggle=document.querySelector(".menu-toggle");
const navigation=document.querySelector("#primary-navigation");
function setMenu(open){navigation.classList.toggle("open",open);menuToggle.setAttribute("aria-expanded",String(open));menuToggle.setAttribute("aria-label",open?"Close navigation menu":"Open navigation menu")}
menuToggle.addEventListener("click",()=>setMenu(menuToggle.getAttribute("aria-expanded")!=="true"));
navigation.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>setMenu(false)));

const contrastButton=document.querySelector("#contrast-button");
contrastButton.addEventListener("click",()=>{const enabled=document.body.classList.toggle("high-contrast");contrastButton.setAttribute("aria-pressed",String(enabled));contrastButton.textContent=enabled?"Normal contrast":"High contrast"});

const backdrop=document.querySelector("#summary-modal"),modal=backdrop.querySelector(".modal");
const modalTitle=document.querySelector("#modal-title"),modalDescription=document.querySelector("#modal-description");
const closeButton=document.querySelector("#close-modal");let lastFocused=null;
function openModal(button){lastFocused=button;modalTitle.textContent=button.dataset.title;modalDescription.textContent=button.dataset.text;backdrop.hidden=false;closeButton.focus()}
function closeModal(){backdrop.hidden=true;if(lastFocused)lastFocused.focus()}
document.querySelectorAll(".read-more").forEach(button=>button.addEventListener("click",()=>openModal(button)));
closeButton.addEventListener("click",closeModal);
backdrop.addEventListener("click",event=>{if(event.target===backdrop)closeModal()});
document.addEventListener("keydown",event=>{if(backdrop.hidden)return;if(event.key==="Escape"){closeModal();return}if(event.key==="Tab"){const items=modal.querySelectorAll('button:not([disabled]),a[href],input:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])');const first=items[0],last=items[items.length-1];if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}}});

const form=document.querySelector(".feedback-form"),status=document.querySelector("#form-status");
form.addEventListener("submit",event=>{event.preventDefault();if(!form.checkValidity()){form.reportValidity();return}status.textContent="Thank you. Your feedback has been received.";form.reset()});
