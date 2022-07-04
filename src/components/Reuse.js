

export const InputComp = ({ placeholder, className, setValue, type, value }) => (
    <input
        className={`${className}`}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        type={type}
        value={value}
    />
)

export const ButtonComp = ({ btnText, className, submitDetais }) => (
    <button
        className={className}
        onClick={submitDetais}
    >{btnText}</button>
)