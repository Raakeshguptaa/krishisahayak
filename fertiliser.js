function check() {
    // Get the container element
var chipsContainer = document.querySelector('.chips');

// Find the checked radio button within the container
var selectedRadioButton = chipsContainer.querySelector('input[name="fertiliser-seed"]:checked');

// chipsContainer.querySelector('input').checked = false;
// selectedRadioButton.checked = true;
// Check if a radio button is selected
if (selectedRadioButton) {
    // Get the value of the selected radio button
    // console.log(selectedRadioButton);
    // selectedRadioButton.parentElement.style.background = '#000'
    var selectedValue = selectedRadioButton.value;
    // console.log(selectedValue);


  
    // Fetch data from JSON file
    fetch('fertiliser.json')
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            // Process the JSON data
            main = document.querySelector('.container');
            main.innerHTML = ''
            data.forEach(item => {
                // Extract data from each item
                const name = item['name'];
                const quantity = item['quantity'];
                const price = item['price'];
                const img = item['img'];
                const link = item['link'];
                if (selectedValue == item['category']){

                a = document.createElement('a');
                a.classList.add('product-link');
                a.setAttribute('href', link);
                a.setAttribute('target', '_blank');
                // Create a new DOM structure for each item
                const newDOM = document.createElement('div');
                newDOM.classList.add('product');

                const imgElement = document.createElement('img');
                imgElement.setAttribute('src', img);
                imgElement.setAttribute('alt', '');

                const contentDiv = document.createElement('div');
                contentDiv.classList.add('content');

                const nameDiv = document.createElement('div');
                nameDiv.classList.add('name');

                const titleDiv = document.createElement('div');
                titleDiv.classList.add('title');
                titleDiv.textContent = name;

                nameDiv.appendChild(titleDiv);

                const detailDiv = document.createElement('div');
                detailDiv.classList.add('detail');

                const quantityDiv = document.createElement('div');
                quantityDiv.classList.add('quantity');
                quantityDiv.textContent = quantity;

                const priceDiv = document.createElement('div');
                priceDiv.classList.add('price');
                priceDiv.innerHTML = `@<b>  ₹${price}</b>`;

                const buy = document.createElement('button');
                buy.textContent = 'Buy';

                detailDiv.appendChild(quantityDiv);
                detailDiv.appendChild(priceDiv);
                detailDiv.appendChild(buy);

                contentDiv.appendChild(nameDiv);
                contentDiv.appendChild(detailDiv);

                newDOM.appendChild(imgElement);
                newDOM.appendChild(contentDiv);

                // Append the new DOM structure to the document
                a.appendChild(newDOM)
                main.appendChild(a);
        }});
        })
        .catch(error => console.error('Error fetching data:', error));




    }}
    check();