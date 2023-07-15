## Getting Started

First, install the dependencies and then run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Introduction:

We've used Biconomy SDK to implement an account abstracted wallet and have been somewhat successful in that.

The Login prompt allows us to login through social login which is one of the features of account abstraction that you wouldn't need to remember the seed phrase to recover your wallet. It promotes to create a wallet which even grandmas can use.

Then we see the Account dashboard which allows us to keep track of our trandactions and send them as well. The key point to note here is that we do not need to pay the gas fees as it is sponsored by the paymaster which in this case was ourselves.

The key features of the project include:

1. Secure Cryptocurrency Storage and Management: Users can securely store and manage their cryptocurrencies within the implemented solution.

2. Seamless Wallet Creation with Google ID: The project offers the convenience of creating a wallet using users' Google IDs, simplifying the onboarding process.

3. Instant Transaction Execution with Zero Fees: Transactions can be executed promptly, with the fees being handled by our prefunded paymaster, eliminating the need for users to worry about transaction costs.

4. Wide Cryptocurrency Support: The solution supports a broad range of cryptocurrencies, including the native currency MATIC and ERC20 token USDC, ensuring versatility for users.

5. Intuitive and User-Friendly Interface: The project prioritizes providing an intuitive and user-friendly interface, enabling users to navigate with ease.

Throughout the project, several challenges were encountered:

1. Limited Familiarity with Blockchain and Web3: Due to our team's relative newness to the field of Blockchain and Web3, we faced difficulties in identifying user challenges and improving the existing system to address them effectively.

2. Additional Functionality Considerations: While implementing account abstraction, we brainstormed various additional functionalities, such as granting access to trusted accounts for account recovery, exempting transactions below a specific value from requiring signatures, and implementing multiple signature requirements for significant transactions to enhance security. Unfortunately, due to time constraints ,it was not feasible to explore and implement these functionalities alongside account abstraction.

3. Learning Curve with SDKs: As we utilized SDKs for the first time during this project, a significant amount of time was dedicated to studying and understanding their documentation. This impacted our implementation timeline and diverted attention from direct development.

4. One major learning was to not waste much time reading the docs rather start implementing right awawy, it would've saved us a lot of time.

Technologies Used:

1. Biconomy SDK: It is a powerful tech which users can use to create D-apps which are based on Account-Abstraction. It provides all the facilities and is constantly updated.
2. Next.js: A reliable framework for front end.
