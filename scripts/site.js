(async () =>
{
    if ('serviceWorker' in navigator)
        navigator.serviceWorker.register("./sw.js")

    const settings = await fetch("data/settings.json").then(response => response.json());

    console.info("Loaded settings!");
    console.info(settings);

    location.hash = settings.index;

    document.getElementById("btn_open_spotify").href = settings.spotify;
    document.getElementById("wifi_password").innerText = settings.wifi;

    document.getElementById("btn_copy_wifi").onclick = () =>
    {
        navigator.permissions
            .query({name: "clipboard-write", allowWithoutGesture: false})
            .then(navigator.clipboard.writeText(settings.wifi))
        document.getElementById("btn_copy_wifi").innerText = "Kopiert";
        setTimeout(() =>
        {
            document.getElementById("btn_copy_wifi").innerText = "Kopier passord";
        }, 2000);
    }

    let guestList = "";
    for (const [name, gender] of Object.entries(settings.guests))
        guestList += `<div class="guest guest-${gender}">${name}</div>`;
    document.getElementById("guest_list").innerHTML = guestList;

    let itemList = "";
    for (const item of settings.bring)
        itemList += `<li class="item">${item}</li>`;
    document.getElementById("item_list").innerHTML = itemList;
})();