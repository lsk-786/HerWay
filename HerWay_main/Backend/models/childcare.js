document.getElementById('locationForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const location = document.getElementById('location').value;
    const resultsList = document.getElementById('resultsList');
    resultsList.innerHTML = '<li>Loading nearby childcare services...</li>';

    try {
        const response = await fetch(`/api/childcare?location=${location}`);
        const data = await response.json();

        resultsList.innerHTML = '';
        if (data.services && data.services.length > 0) {
            data.services.forEach(service => {
                const li = document.createElement('li');
                li.textContent = `${service.name} - ${service.address}`;
                resultsList.appendChild(li);
            });
        } else {
            resultsList.innerHTML = '<li>No childcare services found in your area.</li>';
        }
    } catch (error) {
        resultsList.innerHTML = '<li>Something went wrong. Please try again later.</li>';
        console.error(error);
    }
});
