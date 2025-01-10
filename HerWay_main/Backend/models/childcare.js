document.getElementById('findChildcareBtn').addEventListener('click', async () => {
    const location = document.getElementById('locationInput').value.trim();

    if (!location) {
        document.getElementById('childcareResults').innerHTML = `
            <div class="error-message">Please enter a location.</div>
        `;
        return;
    }

    try {
        // Fetch childcare services from backend
        const response = await fetch(`/api/childcare?location=${location}`);
        const data = await response.json();

        if (response.ok) {
            renderChildcareServices(data);
        } else {
            document.getElementById('childcareResults').innerHTML = `
                <div class="error-message">${data.message}</div>
            `;
        }
    } catch (error) {
        console.error("Error fetching childcare services:", error);
        document.getElementById('childcareResults').innerHTML = `
            <div class="error-message">Something went wrong. Please try again later.</div>
        `;
    }
});

// Function to render childcare services in the results section
function renderChildcareServices(services) {
    const resultsContainer = document.getElementById('childcareResults');
    resultsContainer.innerHTML = "";

    services.forEach(service => {
        const serviceCard = `
            <div class="service-card">
                <h3>${service.name}</h3>
                <p><strong>Address:</strong> ${service.address}</p>
                <p><strong>Contact:</strong> ${service.contact}</p>
            </div>
        `;
        resultsContainer.innerHTML += serviceCard;
    });
}
