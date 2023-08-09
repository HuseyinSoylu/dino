import { WagmiConfig, createConfig, mainnet } from "wagmi";
import { createPublicClient, http } from "viem";
import Profile from "./components/Profile";
import Header from "./components/Header";
import Write from "./pages/Write";

const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: mainnet,
    transport: http(),
  }),
});

const domain = window.location.host;

async function siweSign(siweMessage) {
  try {
    const from = accounts[0];
    const msg = `0x${Buffer.from(siweMessage, "utf8").toString("hex")}`;
    const sign = await ethereum.request({
      method: "personal_sign",
      params: [msg, from],
    });
    siweResult.innerHTML = sign;
  } catch (err) {
    console.error(err);
    siweResult.innerHTML = `Error: ${err.message}`;
  }
}

// siwe.onclick = async () => {
//   const domain = window.location.host;
//   const from = accounts[0];
//   const siweMessage = `${domain} wants you to sign in with your Ethereum account:\n${from}\n\nI accept the MetaMask Terms of Service: https://community.metamask.io/tos\n\nURI: https://${domain}\nVersion: 1\nChain ID: 1\nNonce: 32891757\nIssued At: 2021-09-30T16:25:24.000Z`;
//   siweSign(siweMessage);
// };

export default function App() {
  return (
    <>
      <Header />
      <WagmiConfig config={config}>
        <Profile />
      </WagmiConfig>
      <button
        className="btn"
        onClick={siweSign(
          `domain wants you to sign in with your Ethereum account:\nThis\n\nI accept the MetaMask Terms of Service: https://community.metamask.io/tos\n\nURI: https://domain\nVersion: 1\nChain ID: 1\nNonce: 32891757\nIssued At: 2021-09-30T16:25:24.000Z`
        )}
      >
        Sign
      </button>

      <Write />
    </>
  );
}
