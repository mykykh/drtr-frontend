"use state"

export default function NumberInput({placeholder, value, onChangeHandler}:
    {placeholder: string, value: number, onChangeHandler: (input: any) => void}) {
    return (<input className="w-full bg-secondary rounded-md p-2
        hover:bg-secondary-hover transition" type="number"
        placeholder={placeholder} value={value} onChange={onChangeHandler} />)
}
