const ToggleLoading = (elementClass: string, show: boolean) => {
  const element = document.querySelector(elementClass);

  if (!element) {
    console.error(`Element with selector "${elementClass}" not found.`);
    return;
  }
 
  const htmlElement = element as HTMLElement;   

  if (show) {
    let loadingContainer = htmlElement.querySelector(".loading-container") as HTMLElement;
    if (!loadingContainer) {
      loadingContainer = document.createElement("div");
      loadingContainer.classList.add("loading-container");

      const spinner = document.createElement("div");
      spinner.classList.add("element-spinner");
      loadingContainer.appendChild(spinner);

      if (getComputedStyle(htmlElement).position === 'static') {
        htmlElement.style.position = "relative";
      }

      htmlElement.appendChild(loadingContainer);
    } else {
      loadingContainer.style.display = "flex";
    }
  } else {
    const loadingContainer = htmlElement.querySelector('.loading-container') as HTMLElement;
    if (loadingContainer) {
      loadingContainer.style.display = 'none';
    }
  }
};
export default ToggleLoading;
