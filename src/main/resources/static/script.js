const apiUrl = "http://localhost:8080/account";  // Make sure this is correct



// ✅ Create Account Function
document.getElementById("createAccountForm")?.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent default form submission

    const nameInput = document.getElementById("name");
    const balanceInput = document.getElementById("balance");
    const responseMessage = document.getElementById("responseMessage");

    try {
        const response = await fetch(`${apiUrl}/create`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                account_holder_name: nameInput.value,
                account_balance: parseFloat(balanceInput.value)  // Convert balance to number
          
				  })
        });
		

        if (response.ok) {
            const data = await response.json();
            responseMessage.innerHTML = `<p style="color: white;">✅ Account Created Successfully! <br> Account Number: <strong>${data.account_number}</strong></p>`;

            // ✅ Clear input fields after success
            nameInput.value = "";
            balanceInput.value = "";
			
        } else {
            responseMessage.innerHTML = `<p style="color: red;">❌ Failed to create account. Please try again.</p>`;
        }
	

    } catch (error) {
        responseMessage.innerHTML = `<p style="color: red;">❌ Server error. Please check your backend!</p>`;
        console.error("Error creating account:", error);
    }
});
// ✅ Go to Home Page Function
function goToHome() {
    window.location.href = "index.html";  // Redirects to home page
}

// ✅ View Account Function
document.getElementById("viewAccountForm")?.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent default form reload

    const accountNumberInput = document.getElementById("accountNumber");
    const accountDetailsDiv = document.getElementById("accountDetails");

    try {
        const response = await fetch(`${apiUrl}/${accountNumberInput.value}`);
        
        if (!response.ok) {
            throw new Error("Account not found!"); // If API returns 404
        }

        const data = await response.json(); // Parse JSON response

        // ✅ Display account details
        accountDetailsDiv.innerHTML = `
            <h3>Account Details</h3>
            <p><strong>Account Number:</strong> ${data.account_number}</p>
            <p><strong>Account Holder Name:</strong> ${data.account_holder_name}</p>
            <p><strong>Account Balance:</strong> ₹${data.account_balance}</p>
        `;

        // ✅ Change input field to an empty box after fetching details
        accountNumberInput.value = "";
        accountNumberInput.placeholder = "Enter Account Number";
    } catch (error) {
        accountDetailsDiv.innerHTML = `<p style="color: red;">❌ ${error.message}</p>`;
        console.error("Error fetching account:", error);
    }
});

// ✅ Go to Home Page Function
function goToHome() {
    window.location.href = "index.html";  // Redirects to home page
}




// ✅ Deposit Money Function
document.getElementById("depositForm")?.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent default form submission

    const accountNumberInput = document.getElementById("accountNumber");
    const amountInput = document.getElementById("amount");
    const depositResponse = document.getElementById("depositResponse");

    try {
        const response = await fetch(`${apiUrl}/deposit/${accountNumberInput.value}/${amountInput.value}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" }
        });

        if (response.ok) {
            const data = await response.json();
            depositResponse.innerHTML = `<p style="color: white;">✅ Amount Deposited Successfully! <br> New Balance: ₹${data.account_balance}</p>`;

            // ✅ Clear input fields after success
            accountNumberInput.value = "";
            amountInput.value = "";
        } else {
            depositResponse.innerHTML = `<p style="color: red;">❌ Deposit failed. Check account number and amount.</p>`;
        }
    } catch (error) {
        depositResponse.innerHTML = `<p style="color: red;">❌ Server error. Please check your backend!</p>`;
        console.error("Error depositing money:", error);
    }
	// ✅ Back Button Function (Goes to Previous Page)
	
});
// ✅ Go to Home Page Function
function goToHome() {
    window.location.href = "index.html";  // Redirects to home page
}



// ✅ Withdraw Money Function
document.getElementById("withdrawForm")?.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent default form submission

    const accountNumberInput = document.getElementById("accountNumber");
    const amountInput = document.getElementById("amount");
    const withdrawResponse = document.getElementById("withdrawResponse");

    try {
        const response = await fetch(`${apiUrl}/withdraw/${accountNumberInput.value}/${amountInput.value}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" }
        });

        if (response.ok) {
            const data = await response.json();
            withdrawResponse.innerHTML = `<p style="color: white;">✅ Amount Withdrawn Successfully! <br> New Balance: ₹${data.account_balance}</p>`;

            // ✅ Clear input fields after success
            accountNumberInput.value = "";
            amountInput.value = "";
        } else {
            withdrawResponse.innerHTML = `<p style="color: red;">❌ Withdrawal failed. Check account number and balance.</p>`;
        }
    } catch (error) {
        withdrawResponse.innerHTML = `<p style="color: red;">❌ Server error. Please check your backend!</p>`;
        console.error("Error withdrawing money:", error);
    }
});

// ✅ Go to Home Page Function
function goToHome() {
    window.location.href = "index.html";  // Redirects to home page
}

// ✅ Close Account Function
async function closeAccount() {
    const accountNumberInput = document.getElementById("closeAccountNumber");
    const closeResponse = document.getElementById("closeResponse");

    try {
        const response = await fetch(`${apiUrl}/delete/${accountNumberInput.value}`, { method: "DELETE" });

        if (response.ok) {
            closeResponse.innerHTML = `<p style="color: white; font-weight: bold;">✅ Account Closed Successfully!</p>`;
            accountNumberInput.value = ""; // ✅ Clear input field after success
        } else {
            closeResponse.innerHTML = `<p style="color: red; font-weight: bold;">❌ Failed to close account. Please check the account number.</p>`;
        }
    } catch (error) {
        closeResponse.innerHTML = `<p style="color: red; font-weight: bold;">❌ Server error! Please try again later.</p>`;
        console.error("Error closing account:", error);
    }
}

// ✅ Go to Home Page Function
function goToHome() {
    window.location.href = "index.html";  // ✅ Redirects to home page
}
