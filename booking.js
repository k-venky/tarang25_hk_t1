document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("sessionForm").addEventListener("submit", function(event) {
        event.preventDefault();
        
        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let date = document.getElementById("date").value;
        let time = document.getElementById("time").value;
        
        if (name && email && date && time) {
            const confirmationMessage = document.getElementById("confirmationMessage");
            confirmationMessage.innerHTML = `
                <h3>Session booked successfully!</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Date:</strong> ${new Date(date).toDateString()}</p>
                <p><strong>Time:</strong> ${time}</p>
                <p>We've sent a confirmation to your email.</p>
            `;
            confirmationMessage.style.display = 'block';
            
            // Reset form
            document.getElementById("sessionForm").reset();
        } else {
            alert("Please fill out all fields before booking a session.");
        }
    });
});

function goBack() {
    window.location.href = "index.html";
}