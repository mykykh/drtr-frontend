export default function MessageCard({id, author, text}: {id: number, author: string, text: string}) {
    return (
        <div className="flex flex-col p-2 bg-secondary rounded-md w-full max-w-3xl">
            <p>id: {id}, author: {author.slice(0, 6)}...{author.slice(author.length - 4)}</p>
            <p>{text}</p>
        </div>
    )
}
