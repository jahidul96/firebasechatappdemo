

export const InputComp = ({ placeholder, className, setValue, type }) => (
    <input
        className={`${className}`}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        type={type}
    />
)

export const ButtonComp = ({ btnText, className, submitDetais }) => (
    <button
        className={className}
        onClick={submitDetais}
    >{btnText}</button>
)