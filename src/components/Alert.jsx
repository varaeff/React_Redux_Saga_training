export function Alert({ text }) {
  return (
    <div className="alert alert-danger" role="alert">
      {text}
    </div>
  );
}
