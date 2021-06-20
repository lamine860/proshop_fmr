const InputField = ({type = 'text', value, name, label, handleChange, placeholder = ''}) => {
    return ( 
        <div>
          <label htmlFor="name" className="block mb-2">
            {label}
          </label>
          <input
            type={type}
            name="name"
            placeholder={placeholder}
            id={name}
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            className="w-full py-2 px-2 rounded-md"
          />
        </div>
    );
}
 
export default InputField;