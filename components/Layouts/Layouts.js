import Navbar from "./Navbar";

function Layouts(props) {
  return (
    <div>
      <Navbar />
      <div className="container">{props.children}</div>
    </div>
  );
}

export default Layouts;
