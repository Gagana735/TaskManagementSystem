import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="flex h-[calc(100vh-12rem)] flex-col items-center justify-center">
      <div className="rounded-full bg-error-100 p-6">
        <AlertTriangle className="h-12 w-12 text-error-600" />
      </div>
      <h1 className="mt-6 text-3xl font-bold text-gray-900">Page Not Found</h1>
      <p className="mt-3 text-center text-gray-600">
        Sorry, we couldn't find the page you're looking for.
      </p>
      <Link to="/" className="btn btn-primary mt-8">
        Go back home
      </Link>
    </div>
  );
};

export default NotFound;