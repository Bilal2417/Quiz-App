"use client"
import Link from "next/link";
import  "./error.css"
 const NotFoundPage: React.FC = () => {
  return (
    <div className="container">
      <h1>Some Error occured</h1>
      <p>Oops! The page you are looking for does not exist.</p>
      <Link href="/">
        <a>Go back to Home</a>
      </Link>
    </div>
  );
};

export default NotFoundPage;
