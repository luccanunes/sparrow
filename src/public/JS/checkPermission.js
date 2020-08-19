async function check() {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: document.cookie }),
    };
    const response = await fetch("/get-levels", options);
    const res = await response.json();

    if (res.includes(location.pathname)) {
    }
}
