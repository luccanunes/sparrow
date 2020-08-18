const setup = (() => {
    const main = document.querySelector(".main");
    const txtDiv = new DOM({ attrs: { class: "txt" } });
    const img = new DOM({ tag: "img" });
    main.appendChild(img);
    main.appendChild(txtDiv);
})();

const main = (async () => {
    let user;
    let psswd;
    if (document.cookie == "null" || document.cookie == "") {
        user = prompt("Welcome! Please enter a username. (you might need this later)");
        let isInDB = await inDb({user: user});
        console.log(isInDB);
        while (user.length == 0 || typeof user == 'undefined' || isInDB) {
            user = prompt("Invalid or already taken username, please try again.");
            isInDB = await inDb({user: user});
        }
        document.cookie = user;
        psswd = prompt("Now enter a password. (be sure to remember this)");
        while (psswd.length == 0 || typeof psswd == 'undefined') {
            psswd = prompt("Invalid password, please try again.");
        }
    } else {
        user = document.cookie;
    }

    let num = await getNum({ user: user });

    let n;
    if (num == -1) {
        n = Math.floor(Math.random() * 8 + 1);
        post(user, psswd, n);
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

function post(user, psswd, n) {
    const data = { user: user, password: psswd, number: n, hasPassed: false };
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };
    fetch("/api", options);
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
    let num = raw.length != 0 ? raw[0].number : -1;

    return num;
}

async function inDb(user) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    };
    console.log('options');
    const response = await fetch("/db", options);
    console.log('response');
    const res = await response.json();
    console.log('res');
    
    return res;
}
