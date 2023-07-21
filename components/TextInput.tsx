"use state"

export default function TextInput({placeholder, value, onChangeHandler}:
    {placeholder: string, value: string, onChangeHandler: (input: any) => void}) {
    return (<input className="w-full bg-secondary rounded-md p-2
        hover:bg-secondary-hover transition" type="text"
        placeholder={placeholder} value={value} onChange={onChangeHandler} />)
}
