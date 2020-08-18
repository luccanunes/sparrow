const setup = (() => {
    const main = document.querySelector(".main");
    const txtDiv = new DOM({ attrs: { class: "txt" } });
    const img = new DOM({ tag: "img" });
    main.appendChild(img);
    main.appendChild(txtDiv);
})();

const main = (async () => {
    let cookie;
    if (document.cookie == "null" || document.cookie == "") {
        cookie = prompt("Welcome! taca um nome ae");
        document.cookie = cookie;
    } else {
        cookie = document.cookie;
    }

    let num = await getNum({ cookie: cookie });

    let n;
    if (num == -1) {
        n = Math.floor(Math.random() * 8 + 1);
        post(cookie, n);
    } else {
        n = num;
    }
    if (n == 8) {
        // lucky you, she get's better every episode /* do not overthink this */
    }
    document.querySelector("img").src = `./imgs/${n}.jpg`;
    const txt = document.querySelector(".txt");
    if (n == 6) {
        txt.innerText = "that's a good one kkkkkkkkkkkkkk";
    }
})();

function post(cookie, n) {
    const data = { cookie: cookie, number: n };
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };
    fetch("/api", options);
}

async function getNum(cookie) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(cookie),
    };
    const response = await fetch("/numbers", options);
    const raw = await response.json();
    let num = raw.length != 0 ? raw[0].number : -1;

    return num;
}
