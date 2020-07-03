import Link from "next/link";

export default function Home() {
  const SetCookie = () => {
    document.cookie = `test=sfafdsfsdf; path=/`;
  };
  return (
    <>
      <div>Hello, next.js</div>
      <Link href="/login">
        <button type="button" className="btn btn-success">
          Console
        </button>
      </Link>
      <Link href="/console/systems">
        <button type="button" className="btn btn-success">
          Systems
        </button>
      </Link>
      <button onClick={SetCookie}>Set</button>
    </>
  );
}
