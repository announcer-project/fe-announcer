import Navbar from "./Navbar";

function Layouts(props) {
    return (
        <div>
            <Navbar/>
            {props.children}
        </div>
    )
}

export default Layouts