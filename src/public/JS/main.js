const setup = (() => {
    const main = document.querySelector(".main");
    const txtDiv = new DOM({ attrs: { class: "txt" } });
    const img = new DOM({ tag: "img" });
    main.appendChild(img);
    main.appendChild(txtDiv);
})();

const main = (async () => {
    let user;
    if (document.cookie == "null" || document.cookie == "" || document.cookie.length === 0) {
        await alert("it seems that you're not logged in yet. let's change that.");
        location.href = "login.html";
    } else {
        user = document.cookie;
        let isInDB = await inDb({ user: user });
        if (!isInDB) {
            await alert("it seems that you're not logged in yet. let's change that.");
            location.href = "login.html";
        }
    }

    let n = await getNum({ user: user });

    if (n == 8) {
        // lucky you, she get's better every episode /* do not overthink this */
    }
    document.querySelector("img").src = `./imgs/${n}.jpg`;
    const txt = document.querySelector(".txt");
    if (n == 6) {
        txt.innerText = "that's a good one kkkkkkkkkkkkkk";
    }
})();

async function inDb(user) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    };
    const response = await fetch("/db", options);
    const res = await response.json();

    return res;
}

async function getNum(user) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    };
    const response = await fetch("/numbers", options);
    const raw = await response.json();
    let num = raw[0].number;

    return num;
}
