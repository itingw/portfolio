let createElement = ( elementData ) => {
	let element = document.createElement(elementData.type);
	element.id = elementData.id ? elementData.id : "";
	element.className = elementData.className ? elementData.className : "";
	element.innerHTML = elementData.innerHTML ? elementData.innerHTML : "";
	element.src = elementData.src ? elementData.src : null;
	element.role = elementData.role ? elementData.role : null;
	element.onclick = elementData.onClick ? elementData.onClick : null;

	elementData.dataToggle ? element.setAttribute("data-toggle", elementData.dataToggle) : null;
	elementData.dataTarget ? element.setAttribute("data-target", elementData.dataTarget) : null;
	elementData.dataParent ? element.setAttribute("data-parent", elementData.dataParent) : null;

	return element;
};

let createRow = (className) => {
    let row = createElement({
      type: "div", 
      className: className,
    });
    return row;
};