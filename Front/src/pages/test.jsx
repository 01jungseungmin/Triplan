import React, { useState, useEffect } from "react";

function TestPage() {
  const [data, setData] = useState("");

  useEffect(() => {
    fetch("http://13.209.211.218:8080/redis/test")
      .then((response) => response.text())
      .then((data) => {
        console.log("Received data:", data);
        setData(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return <div>{data || "Loading data from Redis..."}</div>;
}

export default TestPage;
