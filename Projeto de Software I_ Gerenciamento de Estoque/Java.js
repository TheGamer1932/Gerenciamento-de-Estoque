// Dados do estoque
let stockItems = [];

// Selecionar elementos do DOM
const itemNameInput = document.querySelector("#item-name");
const itemDescriptionInput = document.querySelector("#item-description");
const itemCategoryInput = document.querySelector("#item-category");
const itemSizeInput = document.querySelector("#item-size");
const itemColorInput = document.querySelector("#item-color");
const itemPriceInput = document.querySelector("#item-price");
const addItemBtn = document.querySelector("#add-item-btn");
const itemTableBody = document.querySelector("#item-table-body");
const searchBox = document.querySelector("#search-box");

// Adicionar novo item ao estoque
function addItem() {
	// Criar objeto com informações do item
	let item = {
		name: itemNameInput.value,
		description: itemDescriptionInput.value,
		category: itemCategoryInput.value,
		size: itemSizeInput.value,
		color: itemColorInput.value,
		price: itemPriceInput.value
	};
	
	// Adicionar objeto ao array de estoque
	stockItems.push(item);
	
	// Limpar campos de entrada
	itemNameInput.value = "";
	itemDescriptionInput.value = "";
	itemCategoryInput.value = "";
	itemSizeInput.value = "";
	itemColorInput.value = "";
	itemPriceInput.value = "";
	
	// Atualizar tabela de itens
	updateItemTable();
}

// Atualizar tabela de itens
function updateItemTable() {
	// Limpar tabela de itens
	itemTableBody.innerHTML = "";
	
	// Filtrar itens pelo termo de pesquisa
	let term = searchBox.value.toLowerCase();
	let filteredItems = stockItems.filter(item => item.name.toLowerCase().includes(term) || item.category.toLowerCase().includes(term) || item.size.toLowerCase().includes(term) || item.color.toLowerCase().includes(term) || item.price.toLowerCase().includes(term));
	
	// Adicionar itens à tabela
	filteredItems.forEach(item => {
		let row = document.createElement("tr");
		row.innerHTML = `
			<td>${item.name}</td>
			<td>${item.description}</td>
			<td>${item.category}</td>
			<td>${item.size}</td>
			<td>${item.color}</td>
			<td>${item.price}</td>
			<td><button class="actions-btn" onclick="editItem('${item.name}')">Editar</button> <button class="actions-btn" onclick="deleteItem('${item.name}')">Excluir</button></td>
		`;
		itemTableBody.appendChild(row);
	});
}

// Editar informações de um item
function editItem(name) {
	// Encontrar item pelo nome
	let item = stockItems.find(item => item.name === name);
	
	// Preencher campos de entrada com informações do item
	itemNameInput.value = item.name;
	itemDescriptionInput.value = item.description;
	itemCategoryInput.value = item.category;
	itemSizeInput.value = item.size;
	itemColorInput.value = item.color;
	itemPriceInput.value = item.price;
	
	// Remover item do array de estoque
	stockItems = stockItems.filter(item => item.name !== name);
	
	// Atualizar tabela de itens
	updateItemTable();
}

// Excluir um item do estoque
function deleteItem(name) {
	// Remover item do array de estoque
	stockItems = stockItems.filter(item => item.name !== name);
	
	// Atualizar tabela de itens
	updateItemTable();
}

// Adicionar eventos aos elementos do DOM
addItemBtn.addEventListener("click", addItem);
searchBox.addEventListener("input", updateItemTable);

// Inicializar tabela