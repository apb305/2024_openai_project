import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { userLoggedIn } = useAuth();
  return (
    <main>
      <div className="container text-center">
        <h1 className="mt-5 mb-3">FAQtual</h1>
        <p>
          Welcome to FAQtual, your AI-powered tool for effortless document
          analysis. Seamlessly search through your documents with advanced AI
          technology.
        </p>
        {userLoggedIn ? (
          <a className="btn btn-primary mt-2" href="/dashboard">
            Get Started
          </a>
        ) : (
          <a className="btn btn-primary mt-2" href="/signin">Get Started</a>
        )}
      </div>
    </main>
  );
}
