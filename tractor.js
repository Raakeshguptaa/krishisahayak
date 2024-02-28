const tractorContainer = document.getElementById('buy');

    fetch('tractor.json')
        .then(response => response.json())
        .then(tractorData => {
            
            tractorData.forEach(tractor => {
                const link = document.createElement('a');
                link.href = tractor.link;
                link.setAttribute('target', '_blank');

                const div = document.createElement('div');
                div.classList.add('single');

                const imgDiv = document.createElement('div');
                imgDiv.classList.add('img');
                const img = document.createElement('img');
                img.src = tractor.img;
                img.alt = '';
                imgDiv.appendChild(img);

                const detailDiv = document.createElement('div');
                detailDiv.classList.add('detail');
                const nameDiv = document.createElement('div');
                nameDiv.classList.add('name');
                nameDiv.textContent = tractor.name;

                and = document.createElement('div');
                and.classList.add('and');

                const priceDiv = document.createElement('div');
                priceDiv.classList.add('price');
                priceDiv.innerHTML = `<b>₹${tractor.price}</b>`;
                // const button = document.createElement('button');
                // button.textContent = 'Buy';

                detailDiv.appendChild(nameDiv);

                and.appendChild(priceDiv);
                // and.appendChild(button);

                detailDiv.appendChild(and);

                div.appendChild(imgDiv);
                div.appendChild(detailDiv);

                link.appendChild(div);

                tractorContainer.appendChild(link);
            });
        })
        .catch(error => console.error('Error fetching tractor data:', error));