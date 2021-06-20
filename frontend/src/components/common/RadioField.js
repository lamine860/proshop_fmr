const RadioField = ({ name, label, onChange, value, checked }) => {
  return (
    <div>
      <input
        type="radio"
        name={name}
        id={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        checked={checked} className="mr-4 text-4xl"
      />
      <label className="text-md" htmlFor={label}>{label}</label>
    </div>
  );
};

export default RadioField;
