fetch('loan_data.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Get the UL element
                const loanList = document.getElementById('loan-ul');

                // Iterate through each scheme and create LI elements
                data.forEach(scheme => {
                    const li = document.createElement('li');
                    const a = document.createElement('a');
                    a.setAttribute('target', '_blank')
                    
                    // Set href and text content for the link
                    a.href = scheme.scheme_link;
                    a.textContent = scheme.scheme_name;

                    // Append the link to the list item, and the list item to the UL
                    li.appendChild(a);
                    loanList.appendChild(li);
                });
            })
            .catch(error => {
                console.error('Error fetching loan schemes:', error);
            });