const Alert = ({ type, children }) => {
  const variant =
    type === "success" ? "green" : type === "error" ? "red" : "blue";
  return (
    <div className={`bg-${variant}-200 p-4 m-4`}>
      <p className={`text-${variant}-600`}>{children}</p>
    </div>
  );
};

export default Alert;
