import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div className="flex items-center justify-center h-screen" id="error-page">
      <div className="flex flex-col items-center justify-center ">
        <h1 className="font-bold text-center text-4xl">Oops!</h1>
        <p className="">Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
        <Link className="underline underline-offset-2" to="/">
          Back
        </Link>
      </div>
    </div>
  );
}
