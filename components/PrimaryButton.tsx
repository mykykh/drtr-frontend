export default function PrimaryButton({text, disabled = false, onClickHandler}:
    {text: string, disabled?: boolean, onClickHandler: () => void}) {
    return <button className="p-2 bg-primary rounded-md hover:bg-primary-hover transition"
        onClick={onClickHandler} disabled={disabled}>{text}</button>
}
