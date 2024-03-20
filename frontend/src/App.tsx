import { Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, Divider, Image, Input } from '@nextui-org/react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useMemo, useState } from 'react';

function App() {
  const [isInstitution, setIsInstitution] = useState<boolean>(false);
  const studentColor = useMemo(() => isInstitution ? "default" : "primary", [isInstitution]);
  const institutionColor = useMemo(() => isInstitution ? "primary" : "default", [isInstitution]);
  const account = useAccount()
  // const { connectors, connect, status, error } = useConnect()
  // const { disconnect } = useDisconnect()

  return (
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
        <div id="content" className="w-full flex justify-center">
          {account.status !== 'connected' && (
            <div className="flex flex-col items-center justify-center gap-4">
              <hgroup className="text-5xl text-center">
                <h1>Connect a wallet to unlock</h1>
                <h3 className="text-secondary font-bold">your academic achievements</h3>
              </hgroup>
              <ConnectButton />
            </div>
          )}
          {account.status === 'connected' && (
            <form className="w-1/3">
              <Card >
                <CardHeader>
                  <h1>Create Account</h1>
                </CardHeader>
                <CardBody className="flex flex-col gap-4">
                  <div className="flex w-full gap-4 justify-evenly">
                    <Button className="w-full h-fit py-2" color={studentColor} size="lg" onClick={() => setIsInstitution(false)}>
                      <div className="flex flex-col items-center">
                        <Image width={50} alt="student" src="/images/student.png" />
                        <span className="text-wrap text-xs" >I'm a certification receiver</span>
                      </div>
                    </Button>
                    <Button className="w-full h-fit py-2" color={institutionColor} size="lg" onClick={() => setIsInstitution(true)}>
                      <div className="flex flex-col items-center">
                        <Image width={50} alt="institution" src="/images/institution.png" />
                        <span className="text-wrap text-xs" >I'm a certification emmiter</span>
                      </div>
                    </Button>
                  </div>
                  <div className="flex w-full flex-wrap gap-4">
                    <Input type="text" label="Name" />
                    <Input type="text" label="Username" />
                    <Input type="email" label="Email" />
                  </div>
                </CardBody>
                <CardFooter className="flex justify-center">
                  <Button className="w-full" color="primary">Register</Button>
                </CardFooter>
              </Card>
            </form>
          )}
        </div>
      </div>
      <div id="footer" className="fixed bottom-0 left-0 z-20 h-14 w-full p-4 shadow text-center bg-slate-900">
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
      </Card>


      <div>
        <h2>Connect</h2>
        <ButtonGroup>
          {connectors.map((connector) => (
            <Button
              key={connector.uid}
              onClick={() => connect({ connector })}
            >
              {connector.name}
            </Button>
          ))}
        </ButtonGroup>
        <div>{status}</div>
        <div>{error?.message}</div>
      </div> */}
    </>
  )
}

export default App
