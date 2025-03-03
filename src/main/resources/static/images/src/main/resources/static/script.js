document.addEventListener("DOMContentLoaded", function () {

    // Create Account
    const createForm = document.getElementById("createAccountForm");
    if (createForm) {
        createForm.addEventListener("submit", async function (event) {
            event.preventDefault();
            const name = document.getElementById("accountHolderName").value;
            const balance = document.getElementById("accountBalance").value;

            const response = await fetch("http://localhost:8080/account/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ account_holder_name: name, account_balance: balance })
            });

            if (response.ok) {
                alert("Account created successfully!");
                createForm.reset();
            } else {
                alert("Error creating account.");
            }
        });
    }

    // View Account Details
    const viewForm = document.getElementById("viewAccountForm");
    if (viewForm) {
        viewForm.addEventListener("submit", async function (event) {
            event.preventDefault();
            const accountNumber = document.getElementById("viewAccountNumber").value;

            const response = await fetch(`http://localhost:8080/account/${accountNumber}`);
            if (!response.ok) {
                alert("Account not found!");
                return;
            }
            const account = await response.json();
            document.getElementById("accountDetails").innerHTML = `
                <p>Account Holder: ${account.account_holder_name}</p>
                <p>Balance: ${account.account_balance}</p>
            `;
        });
    }

    // Deposit Money
    const depositForm = document.getElementById("depositForm");
    if (depositForm) {
        depositForm.addEventListener("submit", async function (event) {
            event.preventDefault();
            const accountNumber = document.getElementById("depositAccountNumber").value;
            const amount = document.getElementById("depositAmount").value;

            const response = await fetch(`http://localhost:8080/account/deposit/${accountNumber}/${amount}`, {
                method: "PUT"
            });

            if (response.ok) {
                alert("Deposit successful!");
                depositForm.reset();
            } else {
                alert("Error depositing money.");
            }
        });
    }

    // Withdraw Money
    const withdrawForm = document.getElementById("withdrawForm");
    if (withdrawForm) {
        withdrawForm.addEventListener("submit", async function (event) {
            event.preventDefault();
            const accountNumber = document.getElementById("withdrawAccountNumber").value;
            const amount = document.getElementById("withdrawAmount").value;

            const response = await fetch(`http://localhost:8080/account/withdraw/${accountNumber}/${amount}`, {
                method: "PUT"
            });

            if (response.ok) {
                alert("Withdrawal successful!");
                withdrawForm.reset();
            } else {
                alert("Error withdrawing money.");
            }
        });
    }

    // Close Account
    const closeForm = document.getElementById("closeAccountForm");
    if (closeForm) {
        closeForm.addEventListener("submit", async function (event) {
            event.preventDefault();
            const accountNumber = document.getElementById("closeAccountNumber").value;

            const response = await fetch(`http://localhost:8080/account/delete/${accountNumber}`, {
                method: "DELETE"
            });

            if (response.ok) {
                alert("Account closed successfully!");
                closeForm.reset();
            } else {
                alert("Error closing account.");
            }
        });
    }
});
