

export const InputComp = ({ placeholder, className, setValue, type, value }) => (
    <input
        className={`${className}`}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        type={type}
        value={value}
    />
)

export const ButtonComp = ({ btnText, className, submitDetais, loading, noNeed, loadingText }) => (
    <button
        className={className}
        onClick={submitDetais}
    >{noNeed ? btnText : loading ? btnText : loadingText}</button>
)

export const ChatText = () => (
    <div className='h-16 bg-white my-3 px-3 flex items-center'>
        <p className="font-medium">Chats</p>
    </div>
)

export const TextComp = () => (
    <div className='h-full w-full flex justify-center items-center'
    >
        <p
            className='text-center py-2 font-semibold text-white'
        >No user found</p></div>
)