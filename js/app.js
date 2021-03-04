var app = {
    // styles : [] des class de couleur
    // currentStyle : la class appliquée au clic sur une case
    init: function() {
        //VARIABLES GLOBALES-------------------------

        //Sets important constants and variables

        app.container = document.getElementById("invader");
        app.rows = document.getElementsByClassName("gridRow");
        
        app.formConfig = document.querySelector(".configuration");
        
        //generation du formulaire
        app.generateForm();

        //generation du selecteur de couleur
        app.generateStyleSelector();
        
        //Remise à zero de la grille
        app.defaultGrid(8,8);
    },

    generateForm: function () {
        //Modification du formulaire
        app.formConfigContent = '<label for="name"></label>'
        app.formConfigContent +='<input class="theFormField" type="number" id="name" name="name" minlength="0" maxlength="8" size="10" placeholder="Taille de la grille">';
        app.formConfigContent +='<input class="theFormField_pixel" type="number" id="name" name="name" minlength="0" maxlength="8" size="10" placeholder="Taille des pixels">';
        app.formConfigContent += '<input class="theFormButton" type="submit" id="name" name="name" minlength="4" maxlength="8" size="10" >';
        app.formHtlm = document.createElement("div");
        app.formHtlm.innerHTML = app.formConfigContent;
        app.formHtlm.className = "theForm";
        app.formConfig.appendChild(app.formHtlm);
        app.formConfig.addEventListener('submit', app.gridChange);
    },

    defaultGrid: function (rowNum, cellNum, pixel) {
    
        app.makeRows(rowNum, pixel);
        app.makeColumns(cellNum, pixel);

        //On branche nos cellules avec un évènement onClick
        var cells = document.getElementsByClassName("cell");

        for (var index = 0; index < cells.length; index++) {
            var theCell = cells[index];
    
            theCell.addEventListener('click', app.changeCellColor);
        }

    },

    //Remove Grid

    removeGrid: function () {
        var removedRow = document.querySelectorAll(".gridRow");
        var removedCell = document.querySelectorAll(".cell");
        for (let index = 0; index < removedRow.length; index++) {
            removedRow[index].remove();
        };

        for (let index2 = 0; index2 < removedRow.length; index2++) {
            removedCell[index2].remove();
        };

    },

    //Takes (rows, columns) input and makes a grid
    //Creates rows
    makeRows: function (rowNum, pixel) {
        pixel = String(pixel + 2);
        
        for (r = 0; r < rowNum; r++) {
            var row = document.createElement("div");
            row.style.height = pixel + "px";
            console.log(app.container);
            app.container.appendChild(row).className = "gridRow";
            
        
        };
    },

    //Creates cells
    makeColumns: function (cellNum, pixel="24") {
        for (i = 0; i < app.rows.length; i++) {
            for (j = 0; j < cellNum; j++) {
                var newCell = document.createElement("div");
                newCell.style.minWidth = pixel + "px"
                newCell.style.minHeight = pixel + "px"
                app.rows[j].appendChild(newCell).className = "cell";
                
            };

        };
    },

    //générateur de couleurs
    generateStyleSelector: function() {
        // un array pour lister les "couleurs" disponibles
        // qui sont en fait des class
        app.styles = [
            'initialGrey',
            'plain',
            'empty',
            'light',
            'highlight',
            'pink',
            'green'
        ];

        app.currentStyle = app.styles[0];

        /* Génération du sélecteur de couleur */
        var styleSelector = document.querySelector('#selector');

        // bouclons sur les styles
        for (var index = 0; index < app.styles.length; index++) {
            // pour chaque style, un bouton
            var styleButton = document.createElement('button');

            styleButton.classList.add("style-button", app.styles[index]);
            
            // on va utiliser le dataset de l'élément pour ranger le nom du style qui correspond à chaque bouton
            styleButton.dataset.styleName = app.styles[index];

            styleSelector.appendChild(styleButton);

            // on en profite pour ajouter un écouteur d'événement sur le button
            styleButton.addEventListener('click', app.colorButtonStyle);
        }
    },


    // function for the changing color button
    colorButtonStyle: function (event) {
        
        var inputColorButton = event.target;
        // réaccéder au dataset pour retrouver la bonne info, liée au bouton sur lequel on a cliqué
        app.currentStyle = inputColorButton.dataset.styleName;
        
        

    },

    changeCellColor: function (event) {

        var clickedCell = event.target;
        // je parcours la liste des styles prédéfinis
        for (var styleIndex = 0; styleIndex < app.styles.length; styleIndex++) {
            // et j'essaie de les retirer l'un après l'autre
            clickedCell.classList.remove(app.styles[styleIndex]);
        }

        clickedCell.classList.add(app.currentStyle);
    },

    gridChange: function (evt) {
        

        //Event SUBMIT to create a new grid each time
        
            evt.preventDefault();
            //Capture of the submit for Invader size
            var gridRowChange = document.querySelector(".theFormField");
            var gridPixelChange = document.querySelector(".theFormField_pixel");
            var submitButton = document.querySelector(".theFormButton");
            var convertRow = Number(gridRowChange.value);
            var convertPixel = Number(gridPixelChange.value);
            
            //Reinitialise the grid value
            app.removeGrid();
            app.defaultGrid(convertRow, convertRow, convertPixel);
        
       
        
    }
        

};

document.addEventListener('DOMContentLoaded', app.init);


