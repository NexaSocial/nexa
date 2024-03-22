import { Image } from '@nextui-org/react'
import { useAccount, useAccountEffect } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useState } from 'react';
import Loader from './components/Loader';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { User } from './models/UserModel';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient("https://alqzijljfvoasmlaghii.supabase.co", import.meta.env.VITE_SUPABASE_KEY);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>();

  const account = useAccount()

  async function getUser(address: any) {
    console.log(address);
    const { data: users } = await supabase
      .from('users')
      .select('*').eq('address', address);
    if(users && users?.length > 0) {
      setUser(User.fromJson(users[0]));
    }
  }

  useAccountEffect({
    onConnect(data) {
      getUser(account.address);
      setIsLoading(false);
      console.log('Connected!', data);
    },
    onDisconnect() {
      setIsLoading(false);
      window.location.reload();
      console.log('Disconnected!');
    },
  })

  // const { connectors, connect, status, error } = useConnect()
  // const { disconnect } = useDisconnect()

  return (
    isLoading ? <Loader /> :
      <>
        <div id="header" className="flex justify-between mb-4 bg-background fixed top-0 left-0 w-full p-4 z-50">
          <Image
            width={150}
            alt="Nexa Logo"
            src="/images/logo.png"
          />
          <ConnectButton />
        </div>
        <div id="content-wrap" className="h-full flex justify-center items-center">
          <img id="content-bg" src="/images/nicon.png" />
          <div id="content" className="w-full h-full">
            {account.status === 'connected'
              ? <div className='w-full flex justify-center mt-24'>
                {
                  user
                    ? <Dashboard user={user} />
                    : <Register address={account.address} />
                }
              </div>
              : <div className="h-full flex flex-col items-center justify-center gap-4">
                <hgroup className="text-5xl text-center">
                  <h1>Connect a wallet to unlock</h1>
                  <h3 className="text-secondary font-bold">your academic achievements</h3>
                </hgroup>
                <ConnectButton />
              </div>
            }
          </div>
        </div>
        <div id="footer" className="fixed bottom-0 left-0 z-20 h-14 w-full p-4 shadow text-center bg-purple-950">
          <span className="text-gray-400 text-sm">© 2024 NEXA. All Rights Reserved.</span>
        </div>
        {/* <Card>
        <CardHeader className="flex justify-start">
          <h1 className="font-bold text-lg text-primary">Account Detail</h1>
        </CardHeader>
        <Divider />
        <CardBody>
          <h2 className="font-bold">Account</h2>

          <div>
            status: {account.status}
            <br />
            addresses: {JSON.stringify(account.addresses)}
            <br />
            chainId: {account.chainId}
          </div>

          {account.status === 'connected' && (
            <div className="text-center">
              <Button className="w-min" color="primary" variant="faded" onClick={() => disconnect()}>
                Disconnect
              </Button>
            </div>
          )}
        </CardBody>
      </Card */}
      </>
  )
}

export default App
