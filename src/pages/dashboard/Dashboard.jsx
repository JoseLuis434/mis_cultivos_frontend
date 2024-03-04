import React, { useEffect, useState } from 'react';

export function Dashboard({children}) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  useEffect(() => {
    if (
      localStorage.getItem("email") === null ||
      localStorage.getItem("password") === null
    ) {
      window.location.href = '/login';
    } else {
      const data = new FormData();
      data.append("email", localStorage.getItem("email"));
      data.append("password", localStorage.getItem("password"));
      fetch("http://localhost:8000/api/login", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message === "authorized") {
            setIsAuthorized(true);
          } else {
            window.location.href = '/login';
          }
        });
    }
  }, []);

  return isAuthorized ? children : null;
}
