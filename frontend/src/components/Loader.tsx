import { Spinner } from '@nextui-org/react';

function Loader() {
    return (
        <div className="absolute top-1/2 left-1/2"><Spinner size="lg" /></div>
    )
}

export default Loader