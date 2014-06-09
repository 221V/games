
function RosterScope(scope)
{
    function Roster(scope) { RosterHandlers(scope); }
    scope.Roster = Roster;
}

function RosterHandlers(scope) {

    scope.apiProvider.on("online_number", function(x) {
        var e = {detail: x.detail.json, raw: x.detail.bert};
        document.getElementById("Users-Online-Number").firstElementChild.textContent = e.detail.toString(); 
    });

    scope.apiProvider.on("online", function (x) {
        var e = {detail: x.detail.json, raw: x.detail.bert};
        var msg = e.detail, id = msg[0], name = msg[1], surname = msg[2];
        if (null != document.getElementById(id)) removeOnlineUser(id);
        addOnlineUser(id,name+" "+surname,"insertTop");
    });

    scope.apiProvider.on("offline", function (x) {
        var e = {detail: x.detail.json, raw: x.detail.bert};
        var msg = e.detail, id = msg[0], name = msg[1], surname = msg[2];
        if (null != document.getElementById(id)) removeOnlineUser(id);
        addOnlineUser(id,name+" "+surname,"appendChild");
    });

    scope.apiProvider.on("roster_item", function (x) {
        var e = {detail: x.detail.json, raw: x.detail.bert};
        var msg = e.detail, id = msg[0], name = msg[1], surname = msg[2];
        addOnlineUser(id,name+" "+surname,"appendChild");
    });

    scope.apiProvider.on("roster_end", function (x) {
        var e = {detail: x.detail.json, raw: x.detail.bert};
        onlineHover();
        mouseWheelHandler({'detail':scroll,'wheelDelta':scroll});
        onlineHoverOut();
        document.getElementById("Online-List").style.display = '';
    });

    scope.apiProvider.on("roster_group", function (x) {
        var e = {detail: x.detail.json, raw: x.detail.bert};
        var list = dec(e.raw).value[0][1];
        for (var i=0;i<list.length;i++) {
            var item = list[i],
                id = item.value[0][0].value,
                names = item.value[0][1].value,
                surnames = item.value[0][2].value;
            addOnlineUser(id,names+" "+surnames,'appendChild');
        }
    });

}
