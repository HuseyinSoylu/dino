import { WagmiConfig, createConfig, mainnet } from "wagmi";
import { createPublicClient, http } from "viem";
import Profile from "./components/Profile";
import Header from "./components/Header";

const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: mainnet,
    transport: http(),
  }),
});

export default function App() {
  return (
    <>
      <Header />
      <br className="p-10" />
      <WagmiConfig config={config}>
        <Profile />
      </WagmiConfig>
    </>
  );
}
