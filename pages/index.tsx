// import '../styles/styles.css'
import "@biconomy/web3-auth/dist/src/style.css";
import Head from "next/head";
import { useRouter } from "next/router";

export default function App() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/home");
  };

  return (
    <div className="body">
      <Head>
        <title>Pixie Purse</title>
      </Head>

      <>
        <header className="he">
          <nav className="sticky-header">
            <div className="header-box">
              <a href="#about">About</a>
            </div>
            <div className="header-box">
              <a href="#features">Features</a>
            </div>
            <div className="header-box">
              <a href="#problems">Problems</a>
            </div>
            <div className="header-box">
              <a href="#contact">Contact</a>
            </div>
          </nav>
        </header>
        <main>
          <div className="flex-container">
            <div className="left-column">
              <section id="about">
                <div className="main-box">
                  <h1>
                    Welcome to our Crypto Wallet Transaction Handler PIXIE PURSE
                  </h1>
                  <p>Manage your digital assets with ease and security.</p>
                  <button onClick={handleClick} className="cta-btn">
                    Get Started
                  </button>
                </div>
              </section>
              <section id="problems">
                <div className="main-box">
                  <h2>Challenges and Solutions</h2>
                  <p>
                    During our project journey, we encountered various obstacles
                    and found <strong>innovative solutions</strong> to ensure a
                    seamless user experience. Our team tackled issues such as...
                  </p>
                  <ul>
                    <li>
                      Problem 1: Using a SDK for the first time was a bit
                      challenging but reading the docs helped a lot.
                    </li>
                    <li>Problem 2: NextJs was a bit tricky to work with.</li>
                    <li>Problem 3:</li>
                  </ul>
                </div>
              </section>
              <section id="signup">
                <div className="main-box">
                  <h2>Tech Used</h2>
                  <p>We have used the following to build this:</p>
                  {/* <form>
              <input type="text" placeholder="Enter your email" />
              <input type="password" placeholder="Choose a password" />
              <button type="submit" className="cta-btn">
                Sign Up
              </button>
            </form> */}
                  <ul>
                    <li>NextJs</li>
                    <li>Biconomy SDK</li>
                  </ul>
                </div>
              </section>
            </div>
            <div className="right-column">
              <section id="features">
                <div className="main-box">
                  <h2>Key Features</h2>
                  <ul>
                    <li>Securely store and manage your cryptocurrencies</li>
                    <li>
                      Allows you ro create a wallet using your google id itself.
                    </li>
                    <li>
                      Instantly execute transactions with zero fees (the fees is
                      handled by our paymaster which is prefunded.)
                    </li>
                    <li>
                      Support for a wide range of cryptocurrencies (Native
                      currency MATIC and ERC20 token USDC)
                    </li>
                    <li>Intuitive and user-friendly interface</li>
                  </ul>
                </div>
              </section>
              <section id="contact">
                <div className="main-box">
                  <h2>Contact Us</h2>
                  <p>
                    We'd love to hear from you! Reach out to our support team
                    for any queries or assistance.
                  </p>
                  <ul>
                    <li>Email: info@cryptowallet.com</li>
                    <li>Phone: +1 123 456 7890</li>
                  </ul>
                </div>
              </section>
            </div>
          </div>
        </main>
        <footer>
          <p>© 2023 Crypto Wallet Transaction Handler. All rights reserved.</p>
        </footer>
      </>
    </div>
  );
}
