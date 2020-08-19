async function hasPermission() {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: document.cookie }),
    };
    const response = await fetch("/get-levels", options);
    const res = await response.json();

    return res.includes(location.pathname);
}
