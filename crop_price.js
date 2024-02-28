
var intermidiateRecords = {};
var allRecords = [];
api = [
fetch('https://api.data.gov.in/resource/7e72bd2f-790a-4444-b111-40858b6a5f47?api-key=579b464db66ec23bdd000001c9882cddb8794e8f562c90fb84b1a51c&format=json&limit=100'),     //maida atta    // api fetch kri, it will store a string
fetch('https://api.data.gov.in/resource/51e05af6-517c-4a13-8d38-caad3a38ca81?api-key=579b464db66ec23bdd000001c9882cddb8794e8f562c90fb84b1a51c&format=json&limit=50'),     // soji
fetch('https://api.data.gov.in/resource/fea3a2d7-60fd-403d-b167-30f3686549ba?api-key=579b464db66ec23bdd000001c9882cddb8794e8f562c90fb84b1a51c&format=json&limit=20'),    // bran
fetch('https://api.data.gov.in/resource/73140461-fda6-4e1b-9b6f-8026067a0077?api-key=579b464db66ec23bdd000001c9882cddb8794e8f562c90fb84b1a51c&format=json&limit=20000'),      // Wheat
fetch('https://api.data.gov.in/resource/adf1a9ed-5032-4631-a527-a45ad898d9bd?api-key=579b464db66ec23bdd000001c9882cddb8794e8f562c90fb84b1a51c&format=json&limit=800'),       // turmeric (raw)     
fetch('https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=579b464db66ec23bdd000001c9882cddb8794e8f562c90fb84b1a51c&format=json&limit=10000'),      // various comodities
fetch('https://api.data.gov.in/resource/14b041b6-e380-4c25-9782-cb0a8e480389?api-key=579b464db66ec23bdd000001c9882cddb8794e8f562c90fb84b1a51c&format=json&limit=all'),   // maize
]
api.forEach( (api) => {

api.then((response) => {
    return response.json()  
})
.then((data) => {
    records = data.records;
    // console.log(records);
    records.forEach(e => {
            let dateObject = new Date(e.arrival_date);
            let day = dateObject.getUTCDate();
            let month = dateObject.getUTCMonth() + 1; // Months are zero-based, so add 1
            let year = dateObject.getUTCFullYear() + 1; // making it of 2023
            date = `${day}/${month}/${year}`


            const key = `${e.state}-${e.district}-${e.market}-${e.commodity}`;
            if (!intermidiateRecords[key] || date > intermidiateRecords[key].date || intermidiateRecords[key].date == 'recent'){
                intermidiateRecords[key] = {
                    state: e.state,
                    district: e.district,
                    market: e.market,
                    name: e.commodity,
                    price: e.modal_price,
                    date: date
                };
            }
            
        });
            
})
.catch((error) => console.log(error))  

});

setTimeout( () => {
    allRecords = Object.values(intermidiateRecords);
    // console.log(allRecords);
    selectState = document.querySelector('form#filter-form select#state');
    selectCommodity = document.querySelector('form#filter-form select#commodity');
    
    // console.log(selectState);
    // console.log(selectCommodity);

    let stateList = [];
    let commodityList = [];
allRecords.forEach((e) => {


    if (!stateList.includes(e.state)) {  
        option = document.createElement('option');
        option.setAttribute('value', e.state);
        option.innerHTML = e.state;
        selectState.append(option);
        stateList.push(e.state);
    }

    if (!commodityList.includes(e.name)) {  
        option = document.createElement('option');
        option.setAttribute('value', e.name);
        option.innerHTML = e.name;
        selectCommodity.append(option);
        commodityList.push(e.name);
    }
});
        
    }, 5000);

    function filter() {
        var selectState = document.getElementById("state");
        var selectedStateIndex = selectState.selectedIndex;
        var selectedStateOption = selectState.options[selectedStateIndex];
        var state = selectedStateOption.value;
    
        var selectCommodity = document.getElementById("commodity");
        var selectedCommodityIndex = selectCommodity.selectedIndex;
        var selectedCommodityOption = selectCommodity.options[selectedCommodityIndex];
        var commodity = selectedCommodityOption.value;
    
        var hasData = false;  // Variable to track if any data is added
    
        priceSection = document.getElementById('priceSection');
        priceSection.innerHTML = '';  // Clear previous content
    
        allRecords.forEach((e) => {
            if (e.state == state && e.name == commodity) {
                hasData = true;
    
                crop = document.createElement('div');
                crop.classList.add('cropPrice');
    
                h3 = document.createElement('h3');
                h3.innerHTML = `<span class="state">${e.state}</span> • <span class="name">${e.name}</span> | <span class="date">${(e.date == 'NaN/NaN/NaN') ? 'recent' : e.date}</span>`;
    
                h2 = document.createElement('h2');
                h2.classList.add('district');
                h2.textContent = e.district;
    
                market = document.createElement('h1');
                market.classList.add('market');
                market.textContent = e.market;
    
                price = document.createElement('h1');
                price.classList.add('price');
                price.textContent = `₹${e.price}`;
    
                crop.appendChild(h3);
                crop.appendChild(h2);
                crop.appendChild(market);
                crop.appendChild(price);
    
                priceSection.appendChild(crop);
            }
        });
    
        if (!hasData) {
            priceSection.innerHTML = '<h2></h2><h2>No data for selected combination.</h2>';
        }
    }
    
document.querySelector('#apply-filter-button').addEventListener('click', filter);