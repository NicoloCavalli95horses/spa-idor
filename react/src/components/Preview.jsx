import './Preview.css';

function Preview({ item, onClick }) {
  return (
    <div
      className={`box ${item.is_premium ? "premium" : ""}`}
      style={{ backgroundColor: item.label }}
      onClick={onClick}
    >
      {item.is_premium ? "premium 🔒" : "free"}
    </div>
  );
}

export default Preview;