export function scrollToElement(query) {
  
  const element = document.querySelector(query);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}
