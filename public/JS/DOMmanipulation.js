function DOM({ tag = "div", text = "", inBody = false, attrs = {} }) {
    const e = document.createElement(tag);
    e.innerText = text;

    Object.keys(attrs).forEach((key) => {
        e.setAttribute(key, attrs[key]);
    });

    if (inBody) document.body.appendChild(e);

    return e;
}
