<script>
        // Menús del restaurante
        const breakfastMenu = {
            "Tostadas Francesas": 5.00,
            "Omelette": 6.50,
            "Panqueques": 7.00  // Nueva opción
        };

        const lunchDinnerMenu = {
            "Burger": 8.00,
            "Sandwich": 6.50,
            "Ensalada Cesar": 7.50  // Nueva opción
        };

        const sidesMenu = {
            "Sopa": 3.00,
            "Ensalada": 2.50,
            "Fruta": 2.00
        };

        const customizationOptions = {
            "Tostadas Francesas": {
                "Canela Extra": 0.50,
                "Frutas Extra": 1.00
            },
            "Omelette": {
                "Queso Extra": 1.00,
                "Hongos Salteados": 0.75
            },
            "Panqueques": {
                "Sirope Extra": 0.50,
                "Nueces": 0.75
            },
            "Burger": {
                "Queso": 1.00,
                "Bacon": 1.50
            },
            "Sandwich": {
                "Carne Extra": 2.00,
                "Queso": 1.00
            },
            "Ensalada Cesar": {
                "Pollo": 1.50,
                "Queso Extra": 0.50
            },
            "Sopa": {
                "Pan tostado": 0.50,
                "Queso": 0.75
            },
            "Ensalada": {
                "Queso": 0.50,
                "Nueces": 0.75
            },
            "Fruta": {
                "Miel": 0.50,
                "Yogurt": 1.00
            }
        };

        // Función para mostrar el menú
        function showMenu(menu) {
            let menuString = "";
            for (let item in menu) {
                menuString += `${item}: $${menu[item].toFixed(2)}\n`;
            }
            return menuString;
        }

        // Función para obtener la selección del usuario
        function getUserSelection(menu, menuType) {
            let selection = prompt(`Por favor elige del ${menuType} menu:\n${showMenu(menu)}`).toLowerCase();
            let selectedItem = Object.keys(menu).find(item => item.toLowerCase() === selection);
            while (!selectedItem) {
                selection = prompt(`Elección no válida. Por favor elige del ${menuType} menu:\n${showMenu(menu)}`).toLowerCase();
                selectedItem = Object.keys(menu).find(item => item.toLowerCase() === selection);
            }
            return selectedItem;
        }

        // Función para obtener la personalización del usuario
        function getCustomization(item) {
            let customizations = customizationOptions[item];
            if (!customizations) return 0;

            let customizationChoice = prompt(`Te gustaría agregar extras a tu ${item}?\n${showMenu(customizations)}\nEscribe 'No' para nada extra.`).toLowerCase();
            if (customizationChoice === 'no') return 0;

            let selectedCustomization = Object.keys(customizations).find(option => option.toLowerCase() === customizationChoice);
            while (!selectedCustomization) {
                customizationChoice = prompt(`Elección no válida. Te gustaría agregar extras a tu ${item}?\n${showMenu(customizations)}\nEscribe 'No' para nada extra.`).toLowerCase();
                if (customizationChoice === 'no') return 0;
                selectedCustomization = Object.keys(customizations).find(option => option.toLowerCase() === customizationChoice);
            }

            alert(`Elegiste: ${selectedCustomization}. ${waitressComment()}`);
            return customizations[selectedCustomization];
        }

        // Función para hacer un comentario de la mesera
        function waitressComment() {
            const comments = [
                "¡Gran elección!",
                "¡Qué delicioso!",
                "¡Excelente opción!",
                "¡Un clásico favorito!",
                "¡Muy bien! ¡Te va a encantar!"
            ];
            return comments[Math.floor(Math.random() * comments.length)];
        }

        // Función para calcular el costo total
        function calculateTotalCost(entree, sides) {
            let totalCost = entree.price + entree.customizationCost;
            sides.forEach(side => totalCost += side.price + side.customizationCost);
            return totalCost;
        }

        // Función para formatear la hora ingresada por el usuario
        function formatInput(input) {
            let parts = input.split(':');
            if (parts.length !== 2) return null;
            let hours = parseInt(parts[0]);
            let minutes = parseInt(parts[1]);
            if (isNaN(hours) || isNaN(minutes)) return null;
            return { hours, minutes };
        }

        // Función para mostrar el recibo
        function generateReceipt(entree, sides, totalCost) {
            let receipt = `Detalle de tu pedido:\n`;
            receipt += `${entree.name}: $${entree.price.toFixed(2)}\n`;
            if (entree.customizationCost > 0) {
                receipt += `Extra en ${entree.name}: $${entree.customizationCost.toFixed(2)}\n`;
            }
            sides.forEach(side => {
                receipt += `${side.name}: $${side.price.toFixed(2)}\n`;
                if (side.customizationCost > 0) {
                    receipt += `Extra en ${side.name}: $${side.customizationCost.toFixed(2)}\n`;
                }
            });
            receipt += `Total: $${totalCost.toFixed(2)}`;
            return receipt;
        }

        // Programa principal
        alert("¡Bienvenido al restaurante Bottega! Nuestro horario es de 7:00 a 23:00 hrs.\n\n" +
              "Desayunos: 7:00 a 10:59 hrs\n" +
              "Almuerzos: 11:00 a 16:59 hrs\n" +
              "Cenas: 17:00 a 23:00 hrs");

        // Solicitar la hora actual al usuario
        let currentTime = prompt("Por favor, ingresa la hora actual en formato 24 horas (HH:mm):");
        let formattedTime = formatInput(currentTime);

        if (!formattedTime) {
            alert("Hora ingresada no válida.");
        } else {
            let { hours, minutes } = formattedTime;
            let menu, mealType;

            if (hours >= 7 && (hours < 11 || (hours === 10 && minutes < 60))) {
                mealType = "Desayuno";
                menu = breakfastMenu;
            } else if (hours >= 11 && (hours < 17 || (hours === 16 && minutes < 60))) {
                mealType = "Almuerzo";
                menu = lunchDinnerMenu;
            } else if (hours >= 17 && (hours < 23 || (hours === 22 && minutes < 60))) {
                mealType = "Cena";
                menu = lunchDinnerMenu;
            } else {
                alert("El restaurante está cerrado. Nuestro horario es de 7:00 a 23:00 hrs.");
                // return;
            }

            let entreeSelection = getUserSelection(menu, mealType);
            alert(`Tú has elegido: ${entreeSelection}. ${waitressComment()}`);
            let entreePrice = menu[entreeSelection];
            let entreeCustomizationCost = getCustomization(entreeSelection);

            // Selección de guarniciones
            let sidesSelections = [];
            for (let i = 0; i < 2; i++) {
                let sideSelection = getUserSelection(sidesMenu, "guarniciones");
                alert(`Has seleccionado: ${sideSelection}. ${waitressComment()}`);
                let sideCustomizationCost = getCustomization(sideSelection);
                sidesSelections.push({ name: sideSelection, price: sidesMenu[sideSelection], customizationCost: sideCustomizationCost });
            }

            let totalCost = calculateTotalCost({ name: entreeSelection, price: entreePrice, customizationCost: entreeCustomizationCost }, sidesSelections);

            let receipt = generateReceipt({ name: entreeSelection, price: entreePrice, customizationCost: entreeCustomizationCost }, sidesSelections, totalCost);

            alert(receipt);
        }
    </script>