"use state"

export default function SubmitInput({value}: {value: string}) {
    return (<input className="w-full bg-primary rounded-md p-2
        hover:bg-primary-hover transition" type="submit" value={value} />)
}
