// Obtengo el container de los grid 
const container = document.querySelector("#grid-container");

//Obtengo el input y texto del "Grid size"
let btnGrid = document.querySelector("#btn-grid");
let gridText = document.querySelector(".grid-text");

//Obtengo los botones
const btnColor = document.getElementById("btn-color");
const btnDraw = document.getElementById("btn-draw");
const btnEraser = document.getElementById("btn-eraser");
const btnFill = document.getElementById("btn-fill");
const btnClear = document.getElementById("btn-clear");
const btnToggle = document.getElementById("btn-toggle");

//Agrego la clase 'active' a los botones mientras estos esten seleccionados
btnDraw.addEventListener("click", () => {
    btnDraw.classList.add("active");
    btnEraser.classList.remove("active");
});

btnEraser.addEventListener("click", () => {
    btnEraser.classList.add("active");
    btnDraw.classList.remove("active");
});

//Creo una funcion para cambiar el color del grid dependiendo de la posicion del mouse
function tailColorMouse() {

    //Agrupo todas las celdas en una variable
    let cells = document.querySelectorAll("#grid-container div");

    //Cuando se apreta el btnFill se llena pinta todas las casillas
    btnFill.addEventListener("click", () => {
        cells.forEach((cell) => {
            cell.style.backgroundColor = btnColor.value;
        });
    });

    //Cuando se apreta el btnClear se elimina todo el color
    btnClear.addEventListener("click", () => {
        cells.forEach((cell) => {
            cell.style.backgroundColor = "rgb(247, 247, 247)";
        });
    });

    //Cuando se apreta el btnToggle los bordes del grid desaparecen
    btnToggle.addEventListener("click", () => {
        cells.forEach((cell) => {
        cell.classList.toggle("activaded");
        });

        // if (btnToggle.classList.contains("activaded")) {
        //     cells.forEach((cell) => {
        //         cell.style.border = "none";
        //     });
        // } else {
        //     cells.forEach((cell) => {
        //         cell.style.borderTop = "1px solid rgb(156, 156, 156)";
        //         cell.style.borderLeft = "1px solid rgb(156, 156, 156)";
        //     });
        // };

    });



    //Cambia el color del fondo al pasar por una celda
    let isMouseDown = false;

    //Añade un evento a cada elemento
    for (let i = 0; i < cells.length; i++) {

        //Si el mouse esta apretado cambia el color
        cells[i].addEventListener("mousedown", (e) => {
            isMouseDown = true;
            if (isMouseDown) {
                if (btnEraser.classList.contains("active")) {
                    e.target.style.backgroundColor = "rgb(247, 247, 247)";
                } else {
                    e.target.style.backgroundColor = btnColor.value;
                }
            }
        });

        //Si el mouse esta apretado y se mueve se cambia el color
        cells[i].addEventListener("mousemove", (e) => {
            if (isMouseDown) {
                if (btnEraser.classList.contains("active")) {
                    e.target.style.backgroundColor = "rgb(247, 247, 247)";
                } else {
                    e.target.style.backgroundColor = btnColor.value;
                }
            }
        });

        //Si el mouse NO esta apretado no hacer nada
        cells[i].addEventListener("mouseup", () => {
            isMouseDown = false;
        });
    }

}

//Display del valor inicial del grid
gridText.textContent = `${btnGrid.value} X ${btnGrid.value}`;

//Display del grid inicial
for (let i = 0; i < (btnGrid.value) * (btnGrid.value); i++) {
    const cell = document.createElement("div");
    cell.classList.add("grid-element");
    //Le agrego una clase a cada uno
    container.appendChild(cell);
}

//Llamo la funcion
tailColorMouse();

//El texto de "grid size" se va actualizando
btnGrid.addEventListener("input", () => {

    // Establecer el tamaño del grid container
    container.style.gridTemplateColumns = `repeat(${btnGrid.value}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${btnGrid.value}, 1fr)`;

    // Eliminar el grid anterior
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    //Creo todas las casillas-celdas iniciales
    for (let i = 0; i < (btnGrid.value) * (btnGrid.value); i++) {
        const cell = document.createElement("div");
        cell.classList.add("grid-element");
        //Le agrego una clase a cada uno
        container.appendChild(cell);
    }
    gridText.textContent = `${btnGrid.value} X ${btnGrid.value}`;

    tailColorMouse();

});


