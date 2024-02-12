import "./Loading.css";

const Loading = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            border: "4px solid #f3f3f3",
            borderRadius: "50%",
            borderTop: "4px solid #3498db",
            width: "40px",
            height: "40px",
            animation: "spin 2s linear infinite",
          }}
        ></div>
        <p>Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
