useEffect(() => {
    fetch("http://13.209.211.218:8080/redis/test")
      .then((response) => response.text())
      .then((data) => {
        setState(data); // 화면에 표시될 상태 업데이트
      })
      .catch((error) => console.error(error));
  }, []);
  