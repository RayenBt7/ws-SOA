const baseUrl = 'http://localhost:8080/tp_revision';

// --- Add Client ---
document.getElementById('client-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const client = {
        cin: document.getElementById('cin').value,
        nom: document.getElementById('nom').value,
        email: document.getElementById('email').value,
        civilite: document.getElementById('civilite').value
    };
    fetch(`${baseUrl}/exercice/revision/add/client`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(client)
    })
    .then(response => {
        if (response.ok) {
            alert('Client added successfully');
            document.getElementById('client-form').reset();
        } else {
            response.text().then(text => alert('Error: ' + text));
        }
    })
    .catch(err => console.error(err));
});

// --- Add Order ---
document.getElementById('order-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const clientId = document.getElementById('client-id').value;
    const order = {
        description: document.getElementById('description').value,
        montant: parseFloat(document.getElementById('montant').value)
    };
    fetch(`${baseUrl}/exercice/revision/clients/${clientId}/commandes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
    })
    .then(response => {
        if (response.ok) {
            alert('Order added successfully');
            document.getElementById('order-form').reset();
        } else {
            response.text().then(text => alert('Error: ' + text));
        }
    })
    .catch(err => console.error(err));
});

// --- View Orders ---
document.getElementById('view-orders-btn').addEventListener('click', function() {
    const clientId = document.getElementById('view-client-id').value;
    fetch(`${baseUrl}/exercice/revision/clients/${clientId}/commandes`)
    .then(response => response.json())
    .then(orders => {
        const ordersList = document.getElementById('orders-list');
        ordersList.innerHTML = '<h3>Orders:</h3>';
        orders.forEach(order => {
            ordersList.innerHTML += `
                <p><strong>ID:</strong> ${order.id}</p>
                <p><strong>Description:</strong> ${order.description}</p>
                <p><strong>Amount:</strong> ${order.montant}</p>
                <p><strong>Total with TVA:</strong> ${order.totalAvecTVA}</p>
                <hr>
            `;
        });
    })
    .catch(error => {
        alert('Error fetching orders');
        console.error(error);
    });
});

// --- Persons Management ---
document.getElementById('list-persons-btn').addEventListener('click', function() {
    fetch(`${baseUrl}/exercice/revision/persons`)
    .then(response => response.json())
    .then(persons => {
        const personsList = document.getElementById('persons-list');
        personsList.innerHTML = '<h3>All Persons:</h3>';
        persons.forEach(person => {
            personsList.innerHTML += `
                <p><strong>ID:</strong> ${person.id}</p>
                <p><strong>CIN:</strong> ${person.cin}</p>
                <p><strong>Name:</strong> ${person.nom}</p>
                <p><strong>Email:</strong> ${person.email}</p>
                <p><strong>Civility:</strong> ${person.civilite}</p>
                <hr>
            `;
        });
    })
    .catch(error => console.error(error));
});

document.getElementById('get-person-btn').addEventListener('click', function() {
    const id = document.getElementById('person-id').value;
    fetch(`${baseUrl}/exercice/revision/persons/${id}`)
    .then(response => {
        if (response.ok) return response.json();
        else throw new Error('Person not found');
    })
    .then(person => {
        const personDetails = document.getElementById('person-details');
        personDetails.innerHTML = `
            <h3>Person Details:</h3>
            <p><strong>ID:</strong> ${person.id}</p>
            <p><strong>CIN:</strong> ${person.cin}</p>
            <p><strong>Name:</strong> ${person.nom}</p>
            <p><strong>Email:</strong> ${person.email}</p>
            <p><strong>Civility:</strong> ${person.civilite}</p>
        `;
    })
    .catch(error => alert(error));

});

document.getElementById('search-persons-btn').addEventListener('click', function() {
    const nom = document.getElementById('search-nom').value;
    fetch(`${baseUrl}/exercice/revision/persons/search/${nom}`)
    .then(response => response.json())
    .then(persons => {
        const searchResults = document.getElementById('search-results');
        searchResults.innerHTML = '<h3>Search Results:</h3>';
        persons.forEach(person => {
            searchResults.innerHTML += `
                <p><strong>ID:</strong> ${person.id}</p>
                <p><strong>CIN:</strong> ${person.cin}</p>
                <p><strong>Name:</strong> ${person.nom}</p>
                <p><strong>Email:</strong> ${person.email}</p>
                <p><strong>Civility:</strong> ${person.civilite}</p>
                <hr>
            `;
        });
    })
    .catch(error => alert('Error searching persons'));
});

document.getElementById('update-person-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const person = {
        id: parseInt(document.getElementById('update-id').value),
        cin: document.getElementById('update-cin').value,
        nom: document.getElementById('update-nom').value,
        email: document.getElementById('update-email').value,
        civilite: document.getElementById('update-civilite').value
    };
    fetch(`${baseUrl}/exercice/revision/persons/${person.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(person)
    })
    .then(response => {
        if (response.ok) {
            alert('Person updated successfully');
            document.getElementById('update-person-form').reset();
        } else {
            response.text().then(text => alert('Error: ' + text));
        }
    })
    .catch(err => console.error(err));
});

document.getElementById('delete-person-btn').addEventListener('click', function() {
    const id = document.getElementById('delete-id').value;
    fetch(`${baseUrl}/exercice/revision/persons/${id}`, { method: 'DELETE' })
    .then(response => {
        if (response.ok) alert('Person deleted successfully');
        else response.text().then(text => alert('Error: ' + text));
    })
    .catch(err => console.error(err));
});
