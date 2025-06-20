export function Comment({author, message}) {
    return (
        <div className="comment">
            <strong>{author ? `${author}:` : ""}</strong>
            <p>{message}</p>
        </div>
    )
}