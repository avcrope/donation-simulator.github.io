document.addEventListener("DOMContentLoaded", function() {
    loadDonationHistory();
});

function loadDonationHistory() {
    const historyContainer = document.getElementById("history-container");
    const totalAmountDisplay = document.getElementById("total-amount");

    // Load Donation History
    let donationHistory = JSON.parse(localStorage.getItem("donationHistory")) || [];
    donationHistory = donationHistory.reverse(); // Reverse the order to display newest donations first

    // Clear history container before updating
    historyContainer.innerHTML = "";

    // Iterate through donation history and append to history container
    donationHistory.forEach(function(donation) {
        const donationCard = document.createElement("div");
        donationCard.classList.add("donation-card");
        donationCard.innerHTML = `
            <p><strong>Name:</strong> ${donation.username}</p>
            <p><strong>Donation:</strong> $${donation.amount.toFixed(2)}</p>
            <p><strong>Message:</strong> ${donation.message}</p>
        `;
        historyContainer.appendChild(donationCard);
    });

    // Load Total Donation Amount
    const totalAmount = donationHistory.reduce(function(acc, donation) {
        return acc + donation.amount;
    }, 0);
    totalAmountDisplay.textContent = totalAmount.toFixed(2);
}

function makeDonation() {
    const username = document.getElementById("username").value;
    const amount = parseFloat(document.getElementById("amount").value);
    const message = document.getElementById("message").value;

    // Create donation object
    const donation = {
        username: username,
        amount: amount,
        message: message
    };

    // Load existing Donation History
    let donationHistory = JSON.parse(localStorage.getItem("donationHistory")) || [];

    // Add new donation to history
    donationHistory.push(donation);

    // Save Donation History to localStorage
    localStorage.setItem("donationHistory", JSON.stringify(donationHistory));

    // Reload Donation History and Total Amount
    loadDonationHistory();

    // Clear input fields
    document.getElementById("username").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("message").value = "";
}

function resetDonations() {
    // Clear Donation History and Total Donation Amount from localStorage
    localStorage.removeItem("donationHistory");

    // Reload Donation History and Total Amount
    loadDonationHistory();
}
