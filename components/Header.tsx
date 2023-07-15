import ConnectButton from "./ConnectButton";

export default function Header() {
    return (
        <header className="sticky top-0 grid grid-cols-3 p-2 bg-secondary">
            <div className="flex">
                <h2 className="text-2xl">drtr</h2>
            </div>
            <div className="flex justify-center">
                <ConnectButton />
            </div>
        </header>
    )
}
