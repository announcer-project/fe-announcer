export default function NavbarNews({ systemid, systemname }) {
  return (
    <div className="shadow-sm">
      <img
        style={{ width: "40px", height: "40px", objectFit: "cover" }}
        src={`${process.env.REACT_APP_STORAGE}/systems/${systemid}.png`}
      />
      <span className="ml-2"><b>{systemname}</b></span>
    </div>
  );
}
