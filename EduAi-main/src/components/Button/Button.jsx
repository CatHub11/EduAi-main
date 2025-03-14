const Button = ({ title }) => {
  return (
    <div className="mt-3 Chat-ai-btn cursor-pointer hover:scale-105 transform duration-300">
      <span>{title}</span>
    </div>
  );
};

export default Button;
