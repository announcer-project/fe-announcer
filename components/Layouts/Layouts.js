import Navbar from "./Navbar";

function Layouts(props) {
  return (
    <div>
      <Navbar />
      <div>{props.children}</div>
    </div>
  );
}

export default Layouts;
