import ConnectButton from "./ConnectButton";

export default function Header() {
    return (
        <header className="flex p-2 justify-between align-center bg-secondary">
            <h2 className="text-2xl">drtr</h2>
            <ConnectButton />
            <div></div>
        </header>
    )
}
